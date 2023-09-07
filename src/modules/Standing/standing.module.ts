import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { StandingController } from './http/controllers/standing.controller';
import { StandingsService } from './standing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Standing])],
  controllers: [StandingController],
  providers: [StandingsService],
})
export class StandingModule {}
