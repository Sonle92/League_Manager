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
import { CreateStandingDto } from '../../dto/standing.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import dataSource from 'db/data-source';
import { LeagueTeam } from '../../../leagueTeam/entities/leagueTeam.entity';
import { Standing } from '../../entities/standing.entity';
import { ScheduleService } from 'src/modules/schedule/schedule.service';
import { HistoryMatch } from '../../dto/historyMatch.dto';

@ApiTags('CRUD-standing')
@Controller('standing')
export class StandingController {
  constructor(
    private standingService: StandingsService,
    private scheduleService: ScheduleService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create new standing' })
  async create(
    @Body(new ValidationPipe()) createStandingDto: CreateStandingDto,
  ) {
    const response = await this.standingService.create(createStandingDto);
    return { message: 'Successful new creation!', response };
  }

  @Get()
  @ApiOperation({ summary: 'get all standing' })
  async findAll(@Res() res, @Req() req) {
    const response = await this.standingService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('standing-matches')
  @ApiOperation({
    summary: 'Results of the last 5 matches as the hometeam,awayteam,all',
  })
  async getMatchesByTeamInLeague(
    @Query(new ValidationPipe()) historyMatch: HistoryMatch,
  ) {
    const yard = historyMatch.yard;
    const leagueId = historyMatch.leagueId;

    return this.standingService.getMatchesByTeamInLeague(yard, leagueId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get standing by id',
  })
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.standingService.getStandingsByLeagueId(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }
}
