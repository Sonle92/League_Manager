import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './interfaces/teams.interface';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTeamDto: CreateTeamDto) {
    await this.teamsService.create(createTeamDto);
    return { message: 'Tạo mới thành công!' };
  }

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }
}
