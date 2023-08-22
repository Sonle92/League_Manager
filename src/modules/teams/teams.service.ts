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
    return this.teamsRepository.find();
  }
  create(createteamdto: CreateTeamDto): Promise<Team> {
    return this.teamsRepository.save(createteamdto);
  }
}
