import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/teams.entity';
import { Player } from 'src/modules/players/entities/players.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';

@Entity()
export class Statitics {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  yellowCard: number;

  @Column()
  redCard: number;

  @ManyToOne(() => Player, (player) => player.statistics)
  player: Player;

  @ManyToOne(() => Schedule, (schedule) => schedule.statistics)
  schedule: Schedule;
}
