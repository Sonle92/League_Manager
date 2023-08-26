import { Injectable, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleMatch } from './schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleMatchDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleMatch)
    private scheduleRepository: Repository<ScheduleMatch>,
  ) {}

  findAll(): Promise<ScheduleMatch[]> {
    return this.scheduleRepository.find({
      relations: ['league', 'homeTeam', 'awayTeam'],
    });
  }
  findOne(id: number): Promise<ScheduleMatch | null> {
    return this.scheduleRepository.findOne({ where: { id } });
  }
  create(
    createScheduleMatchDto: CreateScheduleMatchDto,
  ): Promise<ScheduleMatch> {
    return this.scheduleRepository.save(createScheduleMatchDto);
  }
}
