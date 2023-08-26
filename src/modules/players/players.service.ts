import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './players.entity';
import { CreatePlayerDto } from './dto/create-players.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private PlayerRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.PlayerRepository.find({ relations: ['team'] });
  }

  findOne(player_id: number): Promise<Player | null> {
    return this.PlayerRepository.findOne({ where: { player_id } });
  }
  create(createplayerdto: CreatePlayerDto): Promise<Player> {
    return this.PlayerRepository.save(createplayerdto);
  }
  async update(
    player_id: number,
    createplayerdto: CreatePlayerDto,
  ): Promise<Player | undefined> {
    const a = await this.PlayerRepository.findOne({ where: { player_id } });
    if (!a) {
      throw new NotFoundException(
        'League with ID ' + player_id + ' not found.',
      );
    }
    const entityColumns = Object.keys(a);
    const updateColumns = Object.keys(createplayerdto);

    const invalidColumns = updateColumns.filter(
      (column) => !entityColumns.includes(column),
    );

    if (invalidColumns.length > 0) {
      throw new NotFoundException(
        `Invalid columns: ${invalidColumns.join(', ')}`,
      );
    }
    Object.assign(a, createplayerdto);
    return this.PlayerRepository.save(a);
  }
  async remove(player_id: number): Promise<void> {
    const b = await this.PlayerRepository.findOneBy({ player_id });
    if (!b) {
      throw new NotFoundException(
        'League with ID ' + player_id + ' not found.',
      );
    }
    await this.PlayerRepository.delete(player_id);
  }
}
