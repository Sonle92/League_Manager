import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { ConfigModule } from '@nestjs/config';
import { LeagueTeam } from '../league_team/league_team.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Team, LeagueTeam]), ConfigModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
