import { Injectable, Optional, Inject } from '@nestjs/common';
import { Team } from './interfaces/teams.interface';

@Injectable()
export class TeamsService {
  private readonly teams: Team[] = [];

  findAll(): Team[] {
    return this.teams;
  }
  create(team: Team) {
    this.teams.push(team);
  }
}
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
