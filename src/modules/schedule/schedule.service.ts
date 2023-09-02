import { Injectable, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleRepository } from './repositories/schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      relations: ['league', 'homeTeam', 'awayTeam'],
    });
  }
  findOne(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({ where: { id } });
  }
  create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleRepository.save(createScheduleDto);
  }
}
