import { Module } from '@nestjs/common';
import { ScheduleController } from './http/controllers/schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ConfigModule } from '@nestjs/config';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingsService } from '../Standing/standing.service';
@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Standing]), ConfigModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, StandingsService],
})
export class ScheduleModule {}
