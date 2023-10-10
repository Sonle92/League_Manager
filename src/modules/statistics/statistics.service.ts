import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Statistics } from './entities/statistics.entity';
import { UploadedFileDto } from './dto/statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private readonly StatiticsRepository: Repository<Statistics>,
  ) {}
  findOne(id: string): Promise<Statistics | null> {
    return this.StatiticsRepository.findOne({ where: { id } });
  }
  create(uploadedFileDto: UploadedFileDto): Promise<Statistics> {
    return this.StatiticsRepository.save(uploadedFileDto);
  }
  async findDate(date: number): Promise<any> {
    return true;
  }
}
