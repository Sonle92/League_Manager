import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../teams/teams.entity';
import { ScheduleMatch } from '../schedule/schedule.entity';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  league_id: number;

  @Column()
  league_name: string;

  @Column()
  sport: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @OneToMany(() => Team, (team) => team.league)
  team: Team[];

  @OneToMany(() => ScheduleMatch, (schedule) => schedule.league)
  shedule: ScheduleMatch[];
}
