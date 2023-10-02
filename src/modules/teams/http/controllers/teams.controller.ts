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
  UseInterceptors,
  UploadedFile,
  Version,
} from '@nestjs/common';
import { TeamsService } from '../../teams.service';
import { CreateTeamDto } from '../../dto/team.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import dataSource from 'db/data-source';
import { LeagueTeam } from '../../../leagueTeam/entities/leagueTeam.entity';
import { Standing } from 'src/modules/Standing/entities/standing.entity';
import { StandingsService } from 'src/modules/Standing/standing.service';
import { CreateLeagueTeamDto } from 'src/modules/leagueTeam/dto/leagueTeam.dto';
import { FilesAzureService } from 'src/modules/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('CRUD-Teams')
@Controller('teams')
export class TeamsController {
  constructor(
    private teamsService: TeamsService,
    private standingService: StandingsService,
    private readonly fileService: FilesAzureService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTeamDto })
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) createTeamDto: CreateTeamDto,
  ) {
    await this.teamsService.checkTeamNameExists(createTeamDto.name);
    const containerName = 'demo1';
    const upload = await this.fileService.uploadFile(file, containerName);
    const response = await this.teamsService.saveUrl(upload, createTeamDto);
    const standing = new Standing();
    standing.teamId = response.id;
    standing.leagueId = createTeamDto.leagueId;
    await this.standingService.addStanding(standing);
    return { message: 'Successful new creation!', response };
  }
  @Post('addLeagueToTeam')
  async addLeagueToTeam(
    @Body(new ValidationPipe()) leagueTeam: CreateLeagueTeamDto,
  ) {
    const response = await this.teamsService.addLeagueToTeam(leagueTeam);
    const standing = new Standing();
    standing.teamId = leagueTeam.teamId;
    standing.leagueId = leagueTeam.leagueId;
    await this.standingService.addStanding(standing);
    return { message: 'Add new league to team successfully', response };
  }

  // @Post('upload')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: UploadFileDto })
  // @UseInterceptors(FileInterceptor('logo'))
  // async upload(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() uploadFileDto: UploadFileDto,
  // ) {
  //   const containerName = 'demo1';
  //   const upload = await this.fileService.uploadFile(file, containerName);
  //   this.teamsService.saveUrl(upload, uploadFileDto);
  //   return { upload, message: 'uploaded successfully' };
  // }

  @Get()
  async findAll(@Res() res, @Req() req) {
    const response = await this.teamsService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  @Get('search/key')
  async sarch(@Query('keyword') keyword: string) {
    return this.teamsService.searchTeam(keyword);
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
