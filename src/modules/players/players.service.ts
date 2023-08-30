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

  findOne(id: string): Promise<Player | null> {
    return this.PlayerRepository.findOne({ where: { id } });
  }
  create(createplayerdto: CreatePlayerDto): Promise<Player> {
    return this.PlayerRepository.save(createplayerdto);
  }
  async update(
    id: string,
    createplayerdto: CreatePlayerDto,
  ): Promise<Player | undefined> {
    const a = await this.PlayerRepository.findOne({ where: { id } });
    if (!a) {
      throw new NotFoundException('League with ID ' + id + ' not found.');
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
  async remove(id: string): Promise<void> {
    const b = await this.PlayerRepository.findOneBy({ id });
    if (!b) {
      throw new NotFoundException('League with ID ' + id + ' not found.');
    }
    await this.PlayerRepository.delete(id);
  }
}
