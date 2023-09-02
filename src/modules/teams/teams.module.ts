import { Module } from '@nestjs/common';
import { TeamsController } from './http/controllers/teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';
import { ConfigModule } from '@nestjs/config';
import { LeagueTeam } from '../leagueTeam/entities/leagueTeam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, LeagueTeam]), ConfigModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
