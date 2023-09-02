import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Team } from '../../teams/entities/teams.entity';

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

  @ManyToOne(() => Team, (team) => team.player)
  team: Team;
}
