import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/teams.entity';
import { League } from '../../league/entities/league.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column()
  venue: string;

  @Column()
  homeTeamId: string;

  @Column()
  awayTeamId: string;

  @Column()
  leagueId: string;

  @ManyToOne(() => Team, (team) => team.homeTeamId)
  homeTeam: Team;

  @ManyToOne(() => Team, (team) => team.awayTeamId)
  awayTeam: Team;

  @Column()
  homeTeamScore: number;

  @Column()
  awayTeamScore: number;

  @ManyToOne(() => League, (league) => league.shedule)
  league: League;
}
