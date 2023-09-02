import { Repository } from 'typeorm';
import { Player } from '../entities/players.entity';

export class PlayerRepository extends Repository<Player> {}
