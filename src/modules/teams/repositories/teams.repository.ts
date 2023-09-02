import { Repository } from 'typeorm';
import { Team } from '../entities/teams.entity';

export class TeamRepository extends Repository<Team> {}
