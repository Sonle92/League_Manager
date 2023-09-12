import {
  Injectable,
  Optional,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/schedule.dto';
import { ScheduleRepository } from './repositories/schedule.repository';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingRepository } from '../Standing/repositories/standing.repository';
import { CreateStandingDto } from '../Standing/dto/create-standing.dto';
import { StandingsService } from '../Standing/standing.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => StandingsService))
    private standingsService: StandingsService,
  ) {}
  // private standingsService: StandingsService,
  // @Inject(forwardRef(() => StandingsService))
  // private standingsService: StandingsService,

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
  findOne(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({ where: { id } });
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
  async getMatchesByTeamInLeague(teamId: string, leagueId: string) {
    const recentMatches = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .where(
        '(schedule.homeTeamId = :teamId OR schedule.awayTeamId = :teamId) AND schedule.leagueId = :leagueId',
        {
          teamId,
          leagueId,
        },
      )
      .leftJoinAndSelect('schedule.league', 'league')
      .leftJoinAndSelect('schedule.homeTeam', 'homeTeam')
      .leftJoinAndSelect('schedule.awayTeam', 'awayTeam')
      .select([
        'schedule.id',
        'schedule.date',
        'schedule.startTime',
        'schedule.venue',
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

    const results = [];

    for (const match of recentMatches) {
      const isHomeTeam = match.homeTeam.id === teamId;
      const isWin =
        (isHomeTeam && match.homeTeamScore > match.awayTeamScore) ||
        (!isHomeTeam && match.awayTeamScore > match.homeTeamScore);
      const matchResult = {
        result: isWin ? 'W' : 'L',
        match: match,
      };
      results.push(matchResult);
    }

    return results;
  }
}
