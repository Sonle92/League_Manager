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
import { Player } from '../../entities/players.entity';
import { PlayerService } from '../../players.service';
import { CreatePlayerDto } from '../../dto/players.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Player')
@Controller('players')
export class PlayerController {
  constructor(private PlayerService: PlayerService) {}
  @Get()
  @ApiOperation({
    summary: 'get all player',
  })
  async findAll(@Res() res) {
    const response = await this.PlayerService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  @Get('playerId')
  @ApiOperation({ summary: 'get player by id' })
  async findOne(@Query('id') id: string, @Res() res) {
    const response = await this.PlayerService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('search/key')
  @ApiOperation({ summary: 'search player by key' })
  async sarch(@Query('keyword') keyword: string) {
    return this.PlayerService.searchPlayers(keyword);
  }

  @Post()
  @ApiOperation({ summary: 'create player' })
  async create(
    @Body(new ValidationPipe()) createplayerdto: CreatePlayerDto,
    @Res() res,
  ) {
    const result = await this.PlayerService.create(createplayerdto);
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
  @ApiOperation({ summary: 'update player' })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) createplayerdto: CreatePlayerDto,
    @Res() res,
  ): Promise<Player> {
    const result = await this.PlayerService.update(id, createplayerdto);
    const response = {
      message: 'UPDATE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.OK).json(response);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'delete player' })
  async delete(@Param('id') id: string, @Res() res) {
    const result = await this.PlayerService.remove(id);
    const response = {
      message: 'DELETE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
