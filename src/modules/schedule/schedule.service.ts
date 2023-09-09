import {
  Injectable,
  Optional,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/schedule.dto';
import { ScheduleRepository } from './repositories/schedule.repository';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingRepository } from '../Standing/repositories/standing.repository';
import { CreateStandingDto } from '../Standing/dto/create-standing.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
    @InjectRepository(Standing)
    private standingRepository: StandingRepository,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      relations: ['league', 'homeTeam', 'awayTeam'],
    });
  }
  findOne(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({ where: { id } });
  }
  create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleRepository.save(createScheduleDto);
  }
  async UpdateStanding(createScheduleDto: CreateScheduleDto): Promise<any> {
    const homeTeam = await this.standingRepository.findOne({
      where: {
        teamId: createScheduleDto.homeTeam.id,
        leagueId: createScheduleDto.league.id,
      },
    });
    const awayTeam = await this.standingRepository.findOne({
      where: {
        teamId: createScheduleDto.awayTeam.id,
        leagueId: createScheduleDto.league.id,
      },
    });
    if (homeTeam && awayTeam) {
      homeTeam.played += 1;
      awayTeam.played += 1;
    } else {
      throw new NotFoundException();
    }
    const points =
      createScheduleDto.homeTeamScore > createScheduleDto.awayTeamScore
        ? [3, 0]
        : createScheduleDto.homeTeamScore === createScheduleDto.awayTeamScore
        ? [1, 1]
        : [0, 3];

    const [homeTeamPoints, awayTeamPoints] = points;
    homeTeam.points += homeTeamPoints;
    awayTeam.points += awayTeamPoints;
    if (createScheduleDto.homeTeamScore > createScheduleDto.awayTeamScore) {
      homeTeam.matchesWon += 1;
    } else if (
      createScheduleDto.homeTeamScore === createScheduleDto.awayTeamScore
    ) {
      homeTeam.matchesDrawn += 1;
    } else {
      homeTeam.matchesLost += 1;
    }

    if (createScheduleDto.homeTeamScore < createScheduleDto.awayTeamScore) {
      awayTeam.matchesWon += 1;
    } else if (
      createScheduleDto.homeTeamScore === createScheduleDto.awayTeamScore
    ) {
      awayTeam.matchesDrawn += 1;
    } else {
      awayTeam.matchesLost += 1;
    }
    homeTeam.totalGoals += createScheduleDto.homeTeamScore;
    homeTeam.totalGoalsConceded += createScheduleDto.awayTeamScore;
    homeTeam.goalDifference = homeTeam.totalGoals - homeTeam.totalGoalsConceded;

    awayTeam.totalGoals += createScheduleDto.awayTeamScore;
    awayTeam.totalGoalsConceded += createScheduleDto.homeTeamScore;
    awayTeam.goalDifference = awayTeam.totalGoals - awayTeam.totalGoalsConceded;
    await this.standingRepository.save([homeTeam, awayTeam]);
    return { homeTeam, awayTeam };
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
    });
  }
}
