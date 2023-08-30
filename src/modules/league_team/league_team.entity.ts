import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LeagueTeam {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  leagueId: string;

  @Column()
  teamId: string;
}
