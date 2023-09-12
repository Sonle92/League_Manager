import {
  Injectable,
  Optional,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { Repository } from 'typeorm';
import { CreateStandingDto } from './dto/create-standing.dto';
import { StandingRepository } from './repositories/standing.repository';
import { UpdateStandingDto } from './dto/updateStanding.dto';
import { CreateScheduleDto } from '../schedule/dto/schedule.dto';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private standingRepository: StandingRepository,
    @Inject(forwardRef(() => ScheduleService))
    private scheduleService: ScheduleService,
  ) {}

  findAll(): Promise<Standing[]> {
    return this.standingRepository.find({ relations: ['league', 'team'] });
  }
  findOne(id: string): Promise<Standing | null> {
    return this.standingRepository.findOne({ where: { id } });
  }
  create(createstandingdto: CreateStandingDto): Promise<Standing> {
    return this.standingRepository.save(createstandingdto);
  }
  async getStandingsByLeagueId(leagueId: string): Promise<Standing[]> {
    return this.standingRepository.find({ where: { leagueId } });
  }

  //new
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

  //
  async updateRank(leagueId: string): Promise<any> {
    const standings = await this.standingRepository.find({
      where: { leagueId },
    });
    standings.sort((a, b) => {
      if (a.points === b.points) {
        if (a.played === b.played) {
          return b.goalDifference - a.goalDifference;
        }
        return b.played - a.played;
      }
      return b.points - a.points;
    });

    standings.forEach(async (standing, index) => {
      standing.rank = index + 1;
      await this.standingRepository.save(standing);
    });
  }
}
