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
import { CreateStandingDto } from './dto/standing.dto';
import { StandingRepository } from './repositories/standing.repository';
import { UpdateStandingDto } from './dto/updateStanding.dto';
import { CreateScheduleDto } from '../schedule/dto/schedule.dto';
import { ScheduleService } from '../schedule/schedule.service';
import { match } from 'assert';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private standingRepository: StandingRepository,
    @Inject(forwardRef(() => ScheduleService))
    private scheduleService: ScheduleService,
  ) {}

  findAll(): Promise<Standing[]> {
    return this.standingRepository.find({
      relations: ['league', 'team'],
      order: {
        rank: 'ASC',
      },
    });
  }
  findOne(id: string): Promise<Standing | null> {
    return this.standingRepository.findOne({ where: { id } });
  }
  findByTeam(teamId: string): Promise<Standing | null> {
    return this.standingRepository.findOne({ where: { teamId } });
  }
  findByLeague(leagueId: string): Promise<Standing[] | null> {
    return this.standingRepository.find({ where: { leagueId: leagueId } });
  }
  findByTeamAndLeague(
    leagueId: string,
    teamId: string,
  ): Promise<Standing[] | null> {
    return this.standingRepository.find({
      where: { leagueId: leagueId, teamId: teamId },
    });
  }
  create(createstandingdto: CreateStandingDto): Promise<Standing> {
    return this.standingRepository.save(createstandingdto);
  }
  async getStandingsByLeagueId(leagueId: string): Promise<Standing[]> {
    return this.standingRepository.find({ where: { leagueId } });
  }

  async addStanding(standing: CreateStandingDto): Promise<any> {
    try {
      const response = await this.standingRepository.save(standing);
      return response;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }

  //new
  async UpdateStanding(createScheduleDto: CreateScheduleDto): Promise<any> {
    const homeTeam = await this.standingRepository.findOne({
      where: {
        teamId: createScheduleDto.homeTeamId,
        leagueId: createScheduleDto.leagueId,
      },
    });
    const awayTeam = await this.standingRepository.findOne({
      where: {
        teamId: createScheduleDto.awayTeamId,
        leagueId: createScheduleDto.leagueId,
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

    standings.forEach((standing, index) => {
      standing.rank = index + 1;
    });
    await this.standingRepository.save(standings);
  }

  async getMatchesByTeamInLeague(yard: any, leagueId: string) {
    const getStandingAndSchedule = await this.findByLeagueandSchedule(
      leagueId,
      yard,
    );
    return getStandingAndSchedule;
  }

  //code mới sửa
  async findByLeagueandSchedule(
    leagueId: string,
    yard: string,
  ): Promise<Standing[] | null> {
    const matches = [];
    const standing = await this.standingRepository.find({
      where: { leagueId: leagueId },
    });

    for (const match of standing) {
      const schedule = await this.scheduleService.findByTeamIdAndLeagueId(
        match.leagueId,
        match.teamId,
        yard,
      );
      matches.push({ standings: match, schedule });
    }

    return matches;
  }

  async checkBothTeamsBelongToLeague(
    teamId1: string,
    teamId2: string,
    leagueId: string,
  ): Promise<{ message: string; error?: string; notBelongingTeams: string[] }> {
    try {
      const team1ExistsInLeague = await this.standingRepository.findOne({
        where: {
          teamId: teamId1,
          leagueId,
        },
      });

      const team2ExistsInLeague = await this.standingRepository.findOne({
        where: {
          teamId: teamId2,
          leagueId,
        },
      });

      const notBelongingTeams: string[] = [];

      if (!team1ExistsInLeague) {
        notBelongingTeams.push(teamId1);
      }

      if (!team2ExistsInLeague) {
        notBelongingTeams.push(teamId2);
      }

      if (notBelongingTeams.length === 0) {
        return {
          message: 'Cả hai teamId đều thuộc leagueId.',
          notBelongingTeams: [],
        };
      } else {
        return {
          message: 'Có teamId không thuộc leagueId.',
          notBelongingTeams,
        };
      }
    } catch (error) {
      return {
        message: 'Đã xảy ra lỗi khi kiểm tra.',
        notBelongingTeams: [],
        error: error.message,
      };
    }
  }
}
