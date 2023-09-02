import { Injectable, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { LeagueTeam } from '../leagueTeam/entities/leagueTeam.entity';
import { TeamRepository } from './repositories/teams.repository';
import { LeagueTeamRepository } from '../leagueTeam/repositories/leagueTeam.repository';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: TeamRepository,
    @InjectRepository(LeagueTeam)
    private leagueTeamRepository: LeagueTeamRepository,
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

  async addLeagueToTeam(leagueTeam: LeagueTeam): Promise<any> {
    try {
      const response = await this.leagueTeamRepository.save(leagueTeam);
      return response;
    } catch (error) {
      console.error('Lỗi khi thêm league vào team:', error);
      throw error;
    }
  }
}
