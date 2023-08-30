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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CRUD-Teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTeamDto: CreateTeamDto) {
    const response = await this.teamsService.create(createTeamDto);
    return { message: 'Successful new creation!', response };
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
}
