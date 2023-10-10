import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Query,
  Get,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { StatisticsService } from '../../statistics.service';
import { FilesAzureService } from 'src/modules/upload/upload.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadedFileDto } from '../../dto/statistics.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // @Post('create')
  // async createExample(@Body() dto: UploadedFileDto): Promise<any> {
  //   const example = await this.statisticsService.create(dto);
  //   return `Created Statistics with ID: ${example.id} vs DATE: ${example.date}`;
  // }
  // @Get(':date')
  // async findOne(@Query('date') date: number, @Res() res) {
  //   const response = await this.statisticsService.findDate(date);
  //   if (!response) {
  //     throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
  //   }
  //   return res.status(HttpStatus.OK).json(response);
  // }
}
