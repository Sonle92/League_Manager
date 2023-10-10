import { Module, forwardRef } from '@nestjs/common';
import { StatisticsController } from './http/controllers/statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticModule {}
