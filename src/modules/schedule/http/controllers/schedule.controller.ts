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
} from '@nestjs/common';
import { ScheduleService } from '../../schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from '../../dto/create-schedule.dto';
@ApiTags('CRUD-schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createScheduleDto: CreateScheduleDto,
    @Res() res,
  ) {
    const response = await this.scheduleService.create(createScheduleDto);
    return res.status(HttpStatus.OK).json(response);
  }
  @Get()
  async findAll(@Res() res, @Req() req) {
    const response = await this.scheduleService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Create Success!' }, response);
  }
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.scheduleService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }
}
