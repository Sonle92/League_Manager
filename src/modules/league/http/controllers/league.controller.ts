import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  NotFoundException,
  Res,
  Query,
} from '@nestjs/common';

import { ValidationPipe } from '@nestjs/common';
import { League } from '../../entities/league.entity';
import { LeagueService } from '../../league.service';
import { CreateLeagueDto } from '../../dto/league.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { TimestampToDate } from 'src/decorators/timeStamptoDate.decorator';

@ApiTags('CRUD-Leagues')
@Controller('leagues')
export class LeagueController {
  constructor(
    private LeagueService: LeagueService,
    private AppService: AppService,
  ) {}
  @Get()
  @ApiOperation({ summary: 'get all league' })
  async findAll(@Res() res) {
    const response = await this.LeagueService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('search/key')
  @ApiOperation({ summary: 'search by key' })
  async sarch(@Query('keyword') keyword: string) {
    return this.LeagueService.searchLeague(keyword);
  }
  @Get(':id')
  @ApiOperation({ summary: 'get by league id' })
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.LeagueService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('findByTimestamp/:timestamp')
  @ApiOperation({ summary: 'get league over time' })
  async findLeagueByTimestamp(@Query('timestamp') timestamp: number) {
    const leagues = await this.LeagueService.findLeagueByTimestamp(timestamp);
    if (!leagues || leagues.length === 0) {
      throw new NotFoundException('Not league for timestamp ');
    }
    return leagues;
  }

  @Post()
  @ApiOperation({ summary: 'create new league' })
  async create(
    @Body(new ValidationPipe()) createleaguedto: CreateLeagueDto,
    @Res() res,
  ) {
    await this.LeagueService.checkIfLeagueNameExists(createleaguedto.name);
    const result = await this.LeagueService.create(createleaguedto);
    if (!result) {
      throw new HttpException(
        'Error cannot send data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const response = {
      message: 'CREATE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.CREATED).json(response);
  }
  @Put(':id')
  @ApiOperation({ summary: 'update league by id' })
  async update(
    @Param('id') id: string,
    @Body() createleaguedto: CreateLeagueDto,
    @Res() res,
  ): Promise<League> {
    const result = await this.LeagueService.update(id, createleaguedto);
    const response = {
      message: 'UPDATE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.OK).json(response);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'delete league by id' })
  async delete(@Param('id') id: string, @Res() res) {
    const result = await this.LeagueService.remove(id);
    const response = {
      message: 'DELETE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
