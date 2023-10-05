import {
  Injectable,
  Optional,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import {
  Between,
  Brackets,
  In,
  Like,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateScheduleDto } from './dto/schedule.dto';
import { ScheduleRepository } from './repositories/schedule.repository';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingRepository } from '../Standing/repositories/standing.repository';
import { CreateStandingDto } from '../Standing/dto/standing.dto';
import { StandingsService } from '../Standing/standing.service';
import { TimeStamp } from './dto/timeStamp.dto';
import { StandingYard } from '../Standing/enums/standing.enum';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => StandingsService))
    private standingsService: StandingsService,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      relations: ['league', 'awayTeam', 'homeTeam'],
      select: [
        'id',
        'dateTime',
        'venue',
        'homeTeamScore',
        'awayTeamScore',
        'league',
        'homeTeam',
        'awayTeam',
      ],
    });
  }
  async findOne(id: string): Promise<Schedule | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['league', 'homeTeam', 'awayTeam'],
    });
    return schedule || null;
  }
  async findById(teamId: string, result: string) {
    try {
      const schedule = await this.scheduleRepository.find({
        where: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      });

      if (!schedule || schedule.length === 0) {
        throw new Error(`Could not find schedule for teamId: ${teamId}`);
      }

      const matchingMatches = schedule.filter((match) => {
        if (match.homeTeamScore > match.awayTeamScore && result === 'W') {
          return true;
        } else if (
          match.homeTeamScore < match.awayTeamScore &&
          result === 'L'
        ) {
          return true;
        } else if (
          match.homeTeamScore === match.awayTeamScore &&
          result === 'D'
        ) {
          return true;
        }
        return false;
      });

      return matchingMatches;
    } catch (error) {
      throw new Error(`Could not find schedule for teamId: ${teamId}`);
    }
  }
  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleRepository.save(createScheduleDto);
  }
  async getSchedulesByDateTime(date: number): Promise<Schedule[]> {
    const targetDate = new Date(date * 1000);
    const formattedDate = `${targetDate.getFullYear()}-${(
      targetDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`;
    const startDate = new Date(`${formattedDate} 00:00:00`);
    const endDate = new Date(`${formattedDate} 23:59:59`);
    const response = await this.scheduleRepository.find({
      where: {
        dateTime: Between(startDate, endDate),
      },
    });
    return response;
  }

  async updateScore(
    id: string,
    homeTeamScore: number,
    awayTeamScore: number,
  ): Promise<Schedule | null> {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      return null;
    }
    schedule.homeTeamScore = homeTeamScore;
    schedule.awayTeamScore = awayTeamScore;
    await this.scheduleRepository.save(schedule);

    return schedule;
  }

  async findHistorySchedule(teamId: string): Promise<Schedule[]> {
    return await this.scheduleRepository.find({
      where: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      relations: ['league', 'awayTeam', 'homeTeam'],
      select: [
        'id',
        'dateTime',
        'venue',
        'homeTeamScore',
        'awayTeamScore',
        'league',
        'homeTeam',
        'awayTeam',
      ],
    });
  }

  //code mới sửa
  async findByTeamIdAndLeagueId(
    leagueId: string,
    teamId: string,
    yard: string,
  ): Promise<any> {
    if (yard === StandingYard.Home) {
      const match = await this.scheduleRepository
        .createQueryBuilder('schedule')
        .where('schedule.leagueId = :leagueId', { leagueId })
        .andWhere('(schedule.homeTeamId = :teamId)', { teamId })
        .orderBy('schedule.dateTime', 'ASC')
        .limit(5)
        .getMany();
      return await this.getMatchResult(match, teamId);
    } else if (yard === StandingYard.Away) {
      const match = await this.scheduleRepository
        .createQueryBuilder('schedule')
        .where('schedule.leagueId = :leagueId', { leagueId })
        .andWhere('(schedule.awayTeamId = :teamId)', { teamId })
        .orderBy('schedule.dateTime', 'ASC')
        .limit(5)
        .getMany();
      return await this.getMatchResult(match, teamId);
    } else if (yard === StandingYard.All) {
      const match = await this.scheduleRepository
        .createQueryBuilder('schedule')
        .where('schedule.leagueId = :leagueId', { leagueId })
        .andWhere(
          '(schedule.homeTeamId = :teamId OR schedule.awayTeamId = :teamId)',
          { teamId },
        )
        .orderBy('schedule.dateTime', 'ASC')
        .limit(5)
        .getMany();
      return await this.getMatchResult(match, teamId);
    }
  }

  async getMatchResult(match: any, teamId: string) {
    const results = [];

    for (const a of match) {
      let result = '';
      if (teamId === a.awayTeamId) {
        if (a.awayTeamScore > a.homeTeamScore) {
          result = 'W';
        } else if (a.homeTeamScore > a.awayTeamScore) {
          result = 'L';
        } else {
          result = 'D';
        }
      } else if (teamId === a.homeTeamId) {
        if (a.awayTeamScore < a.homeTeamScore) {
          result = 'W';
        } else if (a.awayTeamScore > a.homeTeamScore) {
          result = 'L';
        } else {
          result = 'D';
        }
      }
      const matchResult = {
        result: result,
        match: {
          id: a.id,
          dateTime: a.dateTime,
          venue: a.venue,
          homeTeamId: a.homeTeamId,
          awayTeamId: a.awayTeamId,
          leagueId: a.leagueId,
          homeTeamScore: a.homeTeamScore,
          awayTeamScore: a.awayTeamScore,
        },
      };
      results.push(matchResult);
    }

    return results;
  }
}
