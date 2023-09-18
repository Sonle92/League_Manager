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
  Brackets,
  In,
  Repository,
  SelectQueryBuilder,
  getRepository,
} from 'typeorm';
import { CreateScheduleDto } from './dto/schedule.dto';
import { ScheduleRepository } from './repositories/schedule.repository';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingRepository } from '../Standing/repositories/standing.repository';
import { CreateStandingDto } from '../Standing/dto/standing.dto';
import { StandingsService } from '../Standing/standing.service';
import { TimeStamp } from './dto/timeStamp.dto';

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
        'date',
        'startTime',
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
  create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleRepository.save(createScheduleDto);
  }
  async getSchedulesByDateTime(date: Date): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: {
        date,
      },
    });
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
        'date',
        'startTime',
        'venue',
        'homeTeamScore',
        'awayTeamScore',
        'league',
        'homeTeam',
        'awayTeam',
      ],
    });
  }

  async getSchedulesForMultipleTeamsAndLeagues(standing: any, yard: string) {
    let conditions: any[];
    const results = [];
    if (yard === 'home') {
      conditions = standing.map(({ teamId, leagueId }) => ({
        homeTeamId: teamId,
        leagueId: leagueId,
      }));
    } else if (yard === 'away') {
      conditions = standing.map(({ teamId, leagueId }) => ({
        awayTeamId: teamId,
        leagueId: leagueId,
      }));
    } else if (yard === 'all') {
      conditions = standing.flatMap(({ teamId, leagueId }) => [
        {
          homeTeamId: teamId,
          leagueId: leagueId,
        },
        {
          awayTeamId: teamId,
          leagueId: leagueId,
        },
      ]);
    } else {
      throw new Error('Invalid value for yard');
    }
    const schedules = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .where(conditions)
      .leftJoinAndSelect('schedule.league', 'league')
      .leftJoinAndSelect('schedule.homeTeam', 'homeTeam')
      .leftJoinAndSelect('schedule.awayTeam', 'awayTeam')
      .select([
        'schedule.id',
        'schedule.date',
        'schedule.startTime',
        'schedule.venue',
        'schedule.homeTeamId',
        'schedule.awayTeamId',
        'schedule.leagueId',
        'homeTeam',
        'awayTeam',
        'league',
        'schedule.homeTeamScore',
        'schedule.awayTeamScore',
      ])
      .orderBy('schedule.date', 'DESC')
      .addOrderBy('schedule.startTime', 'DESC')
      .limit(5)
      .getMany();

    const standingMatches = [];
    for (const item of standing) {
      const { teamId, leagueId } = item;
      const matches = [];
      for (const match of schedules) {
        try {
          let result;

          if (teamId === match.homeTeamId && yard === 'home') {
            result = await this.getMatchResult(match, match.homeTeamId);
          } else if (teamId === match.awayTeamId && yard === 'away') {
            result = await this.getMatchResult(match, match.awayTeamId);
          } else if (yard === 'all') {
            if (teamId === match.homeTeamId) {
              result = await this.getMatchResult(match, match.homeTeamId);
              const matchData = {
                result: result,
                match: match,
              };
              matches.push(matchData);
            } else if (teamId === match.awayTeamId) {
              result = await this.getMatchResult(match, match.awayTeamId);
              const matchData = {
                result: result,
                match: match,
              };
              matches.push(matchData);
            }
          }
          if (result) {
            results.push({
              result,
              match,
            });
          }
        } catch (error) {
          console.error('Error calculating match result:', error);
        }
      }
      const standing = await this.standingsService.findByTeam(teamId);
      const standingData = { standing, matches };
      standingMatches.push(standingData);
    }
    if (yard === 'home' || yard === 'away') {
      return results;
    } else if (yard === 'all') {
      return standingMatches;
    }
  }
  async getMatchResult(match: any, teamId: string) {
    const homeTeamId = match.homeTeam.id;
    const awayTeamId = match.awayTeam.id;
    const homeTeamScore = match.homeTeamScore;
    const awayTeamScore = match.awayTeamScore;

    if (teamId === awayTeamId) {
      if (awayTeamScore > homeTeamScore) {
        return 'W';
      } else if (homeTeamScore > awayTeamScore) {
        return 'L';
      } else {
        return 'D';
      }
    } else if (teamId === homeTeamId) {
      if (awayTeamScore < homeTeamScore) {
        return 'W';
      } else if (awayTeamScore > homeTeamScore) {
        return 'L';
      } else {
        return 'D';
      }
    } else {
      return '';
    }
  }
}
