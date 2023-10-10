import { Module, forwardRef } from '@nestjs/common';
import { ScheduleController } from './http/controllers/schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ConfigModule } from '@nestjs/config';
import { Standing } from '../Standing/entities/standing.entity';
import { StandingsService } from '../Standing/standing.service';
import { StandingModule } from '../Standing/standing.module';
import { League } from '../league/entities/league.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Standing]),
    ConfigModule,
    forwardRef(() => StandingModule),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
