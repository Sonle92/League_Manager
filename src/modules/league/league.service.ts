import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './league.entity';
import { CreateLeagueDto } from './dto/create.league.dto';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private LeaguesRepository: Repository<League>,
  ) {}

  findAll(): Promise<League[]> {
    return this.LeaguesRepository.find({ relations: ['team'] });
  }

  findOne(id: string): Promise<League | null> {
    return this.LeaguesRepository.findOne({ where: { id } });
  }
  create(createleaguedto: CreateLeagueDto): Promise<League> {
    return this.LeaguesRepository.save(createleaguedto);
  }
  async update(
    id: string,
    createleaguedto: CreateLeagueDto,
  ): Promise<League | undefined> {
    const a = await this.LeaguesRepository.findOne({ where: { id } });
    if (!a) {
      throw new NotFoundException('League with ID ' + id + ' not found.');
    }
    const entityColumns = Object.keys(a);
    const updateColumns = Object.keys(createleaguedto);

    const invalidColumns = updateColumns.filter(
      (column) => !entityColumns.includes(column),
    );

    if (invalidColumns.length > 0) {
      throw new NotFoundException(
        `Invalid columns: ${invalidColumns.join(', ')}`,
      );
    }
    Object.assign(a, createleaguedto);
    return this.LeaguesRepository.save(a);
  }
  async remove(id: string): Promise<void> {
    const b = await this.LeaguesRepository.findOne(id);
    if (!b) {
      throw new NotFoundException('League with ID ' + id + ' not found.');
    }
    await this.LeaguesRepository.delete(id);
  }
}
