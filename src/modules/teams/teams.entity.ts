import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { League } from '../league/league.entity';
import { Player } from '../players/players.entity';
import { ScheduleMatch } from '../schedule/schedule.entity';
import { Standing } from '../Standing/standing.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @ManyToMany(() => League, (league) => league.team)
  @JoinTable({
    name: 'league_team',
    joinColumn: {
      name: 'teamId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'leagueId',
      referencedColumnName: 'id',
    },
  })
  league: League[];

  @OneToMany(() => Player, (player) => player.team)
  player: Player[];

  @OneToMany(() => ScheduleMatch, (schedule) => schedule.homeTeam)
  homeMatches: ScheduleMatch[];

  @OneToMany(() => ScheduleMatch, (schedule) => schedule.awayTeam)
  awayMatches: ScheduleMatch[];

  @OneToOne(() => Standing, (standing) => standing.team)
  standing: Standing;
}
