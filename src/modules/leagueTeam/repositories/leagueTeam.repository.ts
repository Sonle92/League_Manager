import { Repository } from 'typeorm';
import { LeagueTeam } from 'src/modules/leagueTeam/entities/leagueTeam.entity';

export class LeagueTeamRepository extends Repository<LeagueTeam> {}
