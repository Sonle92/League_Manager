import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Team } from '../teams/teams.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  player_name: string;

  @Column()
  age: number;

  @Column()
  poisition: string;

  @ManyToOne(() => Team, (team) => team.player)
  team: Team;
}
