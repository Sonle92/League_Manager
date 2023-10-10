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
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import dataSource from 'db/data-source';
import { LeagueTeam } from '../../../leagueTeam/entities/leagueTeam.entity';
import { Standing } from 'src/modules/Standing/entities/standing.entity';
import { StandingsService } from 'src/modules/Standing/standing.service';
import { CreateLeagueTeamDto } from 'src/modules/leagueTeam/dto/leagueTeam.dto';
import { FilesAzureService } from 'src/modules/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileInterceptor } from '../../validators/uploadFile.validator';
import { UploadLogoTeam } from '../../dto/uploadLogo.dto';

@ApiTags('CRUD-Teams')
@Controller('teams')
export class TeamsController {
  constructor(
    private teamsService: TeamsService,
    private standingService: StandingsService,
    private readonly fileService: FilesAzureService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create new team',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTeamDto })
  @UseInterceptors(FileInterceptor('logo'), CustomFileInterceptor)
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
  @ApiOperation({
    summary: 'add league to team',
  })
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

  @Get()
  @ApiOperation({
    summary: 'get all team',
  })
  async findAll(@Res() res, @Req() req) {
    const response = await this.teamsService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  @Get('search/key')
  @ApiOperation({
    summary: 'serach team by key',
  })
  async sarch(@Query('keyword') keyword: string) {
    return this.teamsService.searchTeam(keyword);
  }
  @Get(':id')
  @ApiOperation({
    summary: 'get team by id',
  })
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.teamsService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'delete team by id',
  })
  async delete(@Param('id') id: string, @Res() res) {
    const result = await this.teamsService.remove(id);
    const response = {
      message: 'DELETE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.OK).json(response);
  }
  @Put('uploadLogo')
  @ApiOperation({
    summary: 'upload logo for team',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('logo'), CustomFileInterceptor)
  @ApiBody({ type: UploadLogoTeam })
  async uploadLogoTeam(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id: string,
  ) {
    const containerName = 'demo1';
    const upload = await this.fileService.uploadFile(file, containerName);
    await this.teamsService.updateImage(upload, id);
    return { upload, message: 'uploaded successfully' };
  }
}
