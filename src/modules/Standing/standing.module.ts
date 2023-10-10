import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { StandingController } from './http/controllers/standing.controller';
import { StandingsService } from './standing.service';
import { ScheduleService } from '../schedule/schedule.service';
import { ScheduleModule } from '../schedule/schedule.module';
import { StandingRepository } from './repositories/standing.repository';
import { Schedule } from '../schedule/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Standing, Schedule]),
    forwardRef(() => ScheduleModule),
  ],
  controllers: [StandingController],
  providers: [StandingsService],
  exports: [StandingsService],
})
export class StandingModule {}
