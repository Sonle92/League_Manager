import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingsService } from '../Standing/standing.service';
import { LeagueTeam } from './entities/leagueTeam.entity';
@Module({
  imports: [TypeOrmModule.forFeature([LeagueTeam]), ConfigModule],
})
export class LeagueTeamModule {}
