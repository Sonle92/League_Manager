import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { TeamsService } from './modules/teams/teams.service';
import { PlayerService } from './modules/players/players.service';
import { LeagueService } from './modules/league/league.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => TeamsService))
    private teamsService: TeamsService,
    @Inject(forwardRef(() => PlayerService))
    private playerService: PlayerService,
    @Inject(forwardRef(() => LeagueService))
    private leagueService: LeagueService,
  ) {}
  getHello(): string {
    return 'xinchao vietnam';
  }
  async search(keyword: string) {
    const teams = await this.teamsService.searchTeam(keyword);
    const players = await this.playerService.searchPlayers(keyword);
    const leagues = await this.leagueService.searchLeague(keyword);

    return {
      teams,
      players,
      leagues,
    };
  }
}
