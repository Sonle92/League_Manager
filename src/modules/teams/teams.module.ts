import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([Team]), ConfigModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
