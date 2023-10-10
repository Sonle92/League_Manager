import { Module, forwardRef } from '@nestjs/common';
import { TeamsController } from './http/controllers/teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';
import { ConfigModule } from '@nestjs/config';
import { LeagueTeam } from '../leagueTeam/entities/leagueTeam.entity';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingsService } from '../Standing/standing.service';
import { ScheduleService } from '../schedule/schedule.service';
import { StandingModule } from '../Standing/standing.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from '../upload/upload.module';
import multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, LeagueTeam, Standing]),
    ConfigModule,
    forwardRef(() => StandingModule),
    forwardRef(() => UploadModule),
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
