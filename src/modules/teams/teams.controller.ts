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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './interfaces/teams.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD-Teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTeamDto: CreateTeamDto) {
    await this.teamsService.create(createTeamDto);
    return { message: 'Tạo mới thành công!' };
  }

  async findAll(@Res() res, @Req() req) {
    const response = await this.teamsService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }
}
