import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../teams/teams.entity';
import { League } from '../league/league.entity';

@Entity()
export class ScheduleMatch {
  @PrimaryGeneratedColumn()
  schedule_id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column()
  venue: string;

  @OneToMany(() => Team, (team) => team.league)
  team: Team[];

  @ManyToOne(() => League, (league) => league.shedule)
  league: League;

  @ManyToOne(() => Team, (team) => team.homeMatches)
  homeTeam: Team;

  @ManyToOne(() => Team, (team) => team.awayMatches)
  awayTeam: Team;
}
