import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamsService } from './modules/teams/teams.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private teamsService: TeamsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('search/key')
  async sarch(@Query('keyword') keyword: string) {
    return this.appService.search(keyword);
  }
}
