import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { League } from '../league/league.entity';
import { Player } from '../players/players.entity';
import { ScheduleMatch } from '../schedule/schedule.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @ManyToOne(() => League, (league) => league.team)
  league: League;

  @OneToMany(() => Player, (player) => player.team)
  player: Player[];

  @OneToMany(() => ScheduleMatch, (schedule) => schedule.homeTeam)
  homeMatches: ScheduleMatch[];

  @OneToMany(() => ScheduleMatch, (schedule) => schedule.awayTeam)
  awayMatches: ScheduleMatch[];
}
