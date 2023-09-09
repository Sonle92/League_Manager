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
  async updateRank(): Promise<any> {
    const standings = await this.standingRepository.find();
    standings.sort((a, b) => {
      if (a.points === b.points) {
        if (a.played === b.played) {
          return b.goalDifference - a.goalDifference;
        }
        return b.played - a.played;
      }
      return b.points - a.points;
    });

    standings.forEach(async (standing, index) => {
      standing.rank = index + 1;
      await this.standingRepository.save(standing);
    });
  }
}
