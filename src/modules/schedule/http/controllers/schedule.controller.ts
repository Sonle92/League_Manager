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
import { HistoryScheduleDto } from '../../dto/historySchedule.dto';
import { TimeStamp } from '../../dto/timeStamp.dto';
import { UpdateStandingDto } from 'src/modules/Standing/dto/updateStanding.dto';
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
    return res.status(HttpStatus.OK).json(response);
  }

  @Post('UpdateSchedule')
  async updateScore(
    @Body(new ValidationPipe()) updateStandingDto: UpdateStandingDto,
    @Res() res,
  ) {
    await this.scheduleService.updateScore(
      updateStandingDto.id,
      updateStandingDto.homeTeamScore,
      updateStandingDto.awayTeamScore,
    );
    const standingId = await this.scheduleService.findOne(updateStandingDto.id);
    await this.standingService.UpdateStanding(standingId);
    await this.standingService.updateRank(standingId.leagueId);
    return res.status(HttpStatus.OK).json(standingId);
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
  async findMatchesByTeamId(
    @Query(new ValidationPipe()) historyScheduleDto: HistoryScheduleDto,
  ) {
    const teamId = historyScheduleDto.teamId;
    const matches = await this.scheduleService.findHistorySchedule(teamId);
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.scheduleService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  // @Post('time')
  // async testTimeStamp(
  //   @Body(new ValidationPipe()) createScheduleDto: TimeStamp,
  //   @Res() res,
  // ) {
  //   const response = await this.scheduleService.timestampToDateString(
  //     createScheduleDto.date,
  //   );
  //   console.log(createScheduleDto);
  //   return res.status(HttpStatus.OK).json(response);
  // }
}
