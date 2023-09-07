import {
  Injectable,
  Optional,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { Repository } from 'typeorm';
import { CreateStandingDto } from './dto/create-standing.dto';
import { StandingRepository } from './repositories/standing.repository';
import { UpdateStandingDto } from './dto/updateStanding.dto';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private standingRepository: StandingRepository,
  ) {}

  findAll(): Promise<Standing[]> {
    return this.standingRepository.find({ relations: ['league', 'team'] });
  }
  findOne(id: string): Promise<Standing | null> {
    return this.standingRepository.findOne({ where: { id } });
  }
  create(createstandingdto: CreateStandingDto): Promise<Standing> {
    return this.standingRepository.save(createstandingdto);
  }
  async getStandingsByLeagueId(leagueId: string): Promise<Standing[]> {
    return this.standingRepository.find({ where: { leagueId } });
  }
}
