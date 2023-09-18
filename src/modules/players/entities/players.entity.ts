import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Team } from '../../teams/entities/teams.entity';
import { Statitics } from 'src/modules/statistics/entities/statistics.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  playerName: string;

  @Column()
  age: number;

  @Column()
  poisition: string;

  @Column()
  teamId: string;

  @ManyToOne(() => Team, (team) => team.player)
  team: Team;

  @OneToMany(() => Statitics, (statistics) => statistics.player)
  statistics: Statitics[];
}
