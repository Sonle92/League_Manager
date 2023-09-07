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
import { TeamsService } from '../../teams.service';
import { CreateTeamDto } from '../../dto/team.dto';
import { ApiTags } from '@nestjs/swagger';
import dataSource from 'db/data-source';
import { LeagueTeam } from '../../../leagueTeam/entities/leagueTeam.entity';
import { Standing } from 'src/modules/Standing/entities/standing.entity';

@ApiTags('CRUD-Teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTeamDto: CreateTeamDto) {
    await this.teamsService.checkTeamNameExists(createTeamDto.name);
    const response = await this.teamsService.create(createTeamDto);
    const leagueTeam = new LeagueTeam();
    leagueTeam.leagueId = createTeamDto.leagueId.id;
    leagueTeam.teamId = createTeamDto.id;
    await this.teamsService.addLeagueToTeam(leagueTeam);
    const standing = new Standing();
    standing.teamId = createTeamDto.id;
    standing.leagueId = createTeamDto.leagueId.id;
    await this.teamsService.addStanding(standing);
    return { message: 'Successful new creation!', response };
  }
  @Post('addLeagueToTeam')
  async addLeagueToTeam(@Body(new ValidationPipe()) leagueTeam: LeagueTeam) {
    const response = await this.teamsService.addLeagueToTeam(leagueTeam);
    const standing = new Standing();
    standing.teamId = leagueTeam.teamId;
    standing.leagueId = leagueTeam.leagueId;
    await this.teamsService.addStanding(standing);
    return { message: 'Add new league to team successfully', response };
  }
  @Get()
  async findAll(@Res() res, @Req() req) {
    const response = await this.teamsService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.teamsService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res) {
    const result = await this.teamsService.remove(id);
    const response = {
      message: 'DELETE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
