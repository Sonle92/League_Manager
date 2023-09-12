import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  ValidationPipe,
  Param,
  Res,
  Req,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { StandingsService } from '../../standing.service';
import { CreateStandingDto } from '../../dto/create-standing.dto';
import { ApiTags } from '@nestjs/swagger';
import dataSource from 'db/data-source';
import { LeagueTeam } from '../../../leagueTeam/entities/leagueTeam.entity';
import { Standing } from '../../entities/standing.entity';
import { ScheduleService } from 'src/modules/schedule/schedule.service';

@ApiTags('CRUD-standing')
@Controller('standing')
export class StandingController {
  constructor(
    private standingService: StandingsService,
    private scheduleService: ScheduleService,
  ) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createStandingDto: CreateStandingDto,
  ) {
    const response = await this.standingService.create(createStandingDto);
    return { message: 'Successful new creation!', response };
  }
  @Get()
  async findAll(@Res() res, @Req() req) {
    const response = await this.standingService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('team-matches')
  async getMatchesByTeamInLeague(
    @Query('teamId') teamId: string,
    @Query('leagueId') leagueId: string,
  ): Promise<Standing[]> {
    return this.scheduleService.getMatchesByTeamInLeague(teamId, leagueId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.standingService.getStandingsByLeagueId(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }
}
