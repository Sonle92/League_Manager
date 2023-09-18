import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { CreateLeagueDto } from './dto/league.dto';
import { LeagueRepository } from './repositories/league.repository';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private LeaguesRepository: LeagueRepository,
  ) {}

  findAll(): Promise<League[]> {
    return this.LeaguesRepository.find({
      relations: ['team', 'team.player', 'standing'],
    });
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
  async checkIfLeagueNameExists(name: string): Promise<boolean> {
    const existingLeague = await this.LeaguesRepository.findOne({
      where: { name },
    });
    if (existingLeague) {
      throw new HttpException(
        'League name already exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }
  async searchLeague(keyword: string): Promise<League[]> {
    const sanitizedKeyword = keyword.replace(/\s{2,}/g, ' ').toLowerCase();
    const queryBuilder = this.LeaguesRepository.createQueryBuilder('league');
    queryBuilder.where(`LOWER(league.name) LIKE :keyword`, {
      keyword: `%${sanitizedKeyword}%`,
    });

    queryBuilder
      .orderBy(
        `CASE WHEN league.name LIKE :startsWith THEN 1 ELSE 2 END`,
        'ASC',
      )

      .setParameters({ startsWith: `${sanitizedKeyword}%` });
    return await queryBuilder.getMany();
  }
}
