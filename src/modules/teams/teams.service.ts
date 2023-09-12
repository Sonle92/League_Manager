import {
  Injectable,
  Optional,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/team.dto';
import { LeagueTeam } from '../leagueTeam/entities/leagueTeam.entity';
import { TeamRepository } from './repositories/teams.repository';
import { LeagueTeamRepository } from '../leagueTeam/repositories/leagueTeam.repository';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingRepository } from '../Standing/repositories/standing.repository';
import { CreateStandingDto } from '../Standing/dto/create-standing.dto';
import { CreateLeagueTeamDto } from '../leagueTeam/dto/leagueTeam.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: TeamRepository,
    @InjectRepository(LeagueTeam)
    private leagueTeamRepository: LeagueTeamRepository,
    @InjectRepository(Standing)
    private standingRepository: StandingRepository,
  ) {}

  findAll(): Promise<Team[]> {
    return this.teamsRepository.find({ relations: ['league', 'player'] });
  }
  findOne(id: string): Promise<Team | null> {
    return this.teamsRepository.findOne({ where: { id } });
  }
  create(createteamdto: CreateTeamDto): Promise<Team> {
    return this.teamsRepository.save(createteamdto);
  }

  async addLeagueToTeam(leagueTeam: CreateLeagueTeamDto): Promise<any> {
    try {
      const response = await this.leagueTeamRepository.save(leagueTeam);
      return response;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
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
  async checkTeamNameExists(name: string): Promise<boolean> {
    const existingLeague = await this.teamsRepository.findOne({
      where: { name },
    });
    if (existingLeague) {
      throw new HttpException(
        'Team name already exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }
  async remove(id: string): Promise<void> {
    const b = await this.teamsRepository.findOne({ id });
    if (!b) {
      throw new NotFoundException('User with ID ' + id + ' not found.');
    }
    await this.teamsRepository.delete(id);
  }
  async searchPlayers(keyword: string): Promise<Team[]> {
    const sanitizedKeyword = keyword.replace(/\s{2,}/g, ' ').toLowerCase();
    const queryBuilder = this.teamsRepository.createQueryBuilder('team');
    queryBuilder.where(`LOWER(team.name) LIKE :keyword`, {
      keyword: `%${sanitizedKeyword}%`,
    });

    queryBuilder
      .orderBy(`CASE WHEN team.name LIKE :startsWith THEN 1 ELSE 2 END`, 'ASC')

      .setParameters({ startsWith: `${sanitizedKeyword}%` });
    return await queryBuilder.getMany();
  }
}
