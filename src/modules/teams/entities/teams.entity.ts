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
import { League } from '../../league/entities/league.entity';
import { Player } from '../../players/entities/players.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Standing } from '../../Standing/standing.entity';

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
    name: 'leagueteam',
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

  @OneToMany(() => Schedule, (schedule) => schedule.homeTeam)
  homeTeamId: Schedule[];

  @OneToMany(() => Schedule, (schedule) => schedule.awayTeam)
  awayTeamId: Schedule[];

  @OneToOne(() => Standing, (standing) => standing.team)
  standing: Standing;
}
