import { Injectable, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { LeagueTeam } from '../league_team/league_team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
    @InjectRepository(LeagueTeam)
    private leagueTeamRepository: Repository<LeagueTeam>,
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
  async addTeamToLeague(leagueId: string, teamId: string): Promise<LeagueTeam> {
    const league_team = {
      leagueId: leagueId,
      teamId: teamId,
    };
    try {
      const response = await this.leagueTeamRepository.save(league_team);
      return response;
    } catch (error) {
      return error;
    }
  }
}
