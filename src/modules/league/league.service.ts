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
    return this.LeaguesRepository.find();
  }

  findOne(league_id: number): Promise<League | null> {
    return this.LeaguesRepository.findOne({ where: { league_id } });
  }
  create(createleaguedto: CreateLeagueDto): Promise<League> {
    return this.LeaguesRepository.save(createleaguedto);
  }
  async update(
    league_id: number,
    createleaguedto: CreateLeagueDto,
  ): Promise<League | undefined> {
    const a = await this.LeaguesRepository.findOne({ where: { league_id } });
    if (!a) {
      throw new NotFoundException(
        'League with ID ' + league_id + ' not found.',
      );
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
  async remove(league_id: number): Promise<void> {
    const b = await this.LeaguesRepository.findOneBy({ league_id });
    if (!b) {
      throw new NotFoundException(
        'League with ID ' + league_id + ' not found.',
      );
    }
    await this.LeaguesRepository.delete(league_id);
  }
}
