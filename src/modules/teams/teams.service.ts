import { Injectable, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  findAll(): Promise<Team[]> {
    return this.teamsRepository.find({ relations: ['league'] });
  }
  findOne(id: string): Promise<Team | null> {
    return this.teamsRepository.findOne({ where: { id } });
  }
  create(createteamdto: CreateTeamDto): Promise<Team> {
    return this.teamsRepository.save(createteamdto);
  }
  async addTeamToLeague(teamId: number, leagueId: number): Promise<void> {
    const query = this.teamsRepository.createQueryBuilder();
    query.relation(Team, 'leagues').of(teamId).add(leagueId);
  }
}
