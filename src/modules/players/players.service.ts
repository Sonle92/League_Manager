import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/players.entity';
import { CreatePlayerDto } from './dto/players.dto';
import { PlayerRepository } from './repositories/players.repository';
import { Team } from '../teams/entities/teams.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private PlayerRepository: PlayerRepository,
  ) {}

  findAll(): Promise<Player[]> {
    return this.PlayerRepository.find({ relations: ['team'] });
  }

  findOne(id: string): Promise<Player | null> {
    return this.PlayerRepository.findOne({ where: { id } });
  }
  create(createplayerdto: CreatePlayerDto): Promise<Player> {
    const player = new Player();
    player.playerName = createplayerdto.playerName;
    player.teamId = createplayerdto.teamId;
    player.age = createplayerdto.age;
    player.poisition = createplayerdto.poisition;
    return this.PlayerRepository.save(player);
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
  async searchPlayers(keyword: string): Promise<Player[]> {
    const sanitizedKeyword = keyword.replace(/\s{2,}/g, ' ').toLowerCase();
    const queryBuilder = this.PlayerRepository.createQueryBuilder('player');
    queryBuilder
      .where(`LOWER(player.playerName) LIKE :keyword`, {
        keyword: `%${sanitizedKeyword}%`,
      })
      .orWhere(`LOWER(player.poisition) LIKE :keyword`, {
        keyword: `%${sanitizedKeyword}%`,
      });
    queryBuilder
      .orderBy(
        `CASE WHEN player.playerName LIKE :startsWith THEN 1 ELSE 2 END`,
        'ASC',
      )
      .addOrderBy(
        `CASE WHEN player.poisition LIKE :startsWith THEN 1 ELSE 2 END`,
        'ASC',
      )

      .setParameters({ startsWith: `${sanitizedKeyword}%` });
    return await queryBuilder.getMany();
  }
}
