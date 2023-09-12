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
import { ScheduleService } from '../../schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from '../../dto/schedule.dto';
import { Standing } from 'src/modules/Standing/entities/standing.entity';
import { StandingsService } from 'src/modules/Standing/standing.service';
import { Schedule } from '../../entities/schedule.entity';
@ApiTags('CRUD-schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private standingService: StandingsService,
  ) {}
  @Post()
  async create(
    @Body(new ValidationPipe()) createScheduleDto: CreateScheduleDto,
    @Res() res,
  ) {
    const response = await this.scheduleService.create(createScheduleDto);
    await this.standingService.UpdateStanding(createScheduleDto);
    await this.standingService.updateRank(createScheduleDto.league.id);
    return res.status(HttpStatus.OK).json(response);
  }
  @Get('all')
  async findAll(@Res() res, @Req() req) {
    const response = await this.scheduleService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Create Success!', response });
  }

  @Get('get-date')
  async getScheduleByDateAndTime(@Query('date') date: Date) {
    const schedules = await this.scheduleService.getSchedulesByDateTime(date);
    return schedules;
  }
  @Get('history-match')
  async findMatchesByTeamId(@Query('teamId') teamId: string) {
    const matches = await this.scheduleService.findHistorySchedule(teamId);
    return matches;
  }
  // @Get('team-matches')
  // async getMatchesByTeamInLeague(
  //   @Query('teamId') teamId: string,
  //   @Query('leagueId') leagueId: string,
  // ): Promise<Schedule[]> {
  //   return this.scheduleService.getMatchesByTeamInLeague(teamId, leagueId);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.scheduleService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  // @Put()
  // async updateStanding(@Body()homeTeamS){

  // }
}
