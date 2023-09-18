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

  async timestampToDateString(timestamp: string) {
    const num = Number(timestamp);
    const date = new Date(num * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  async timestampToTimeString(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
}
