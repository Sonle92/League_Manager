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
import { TimestampTransformer } from 'src/modules/statistics/transformers/timestamp.transformer';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamp', transformer: new TimestampTransformer() })
  dateTime: number;

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

  // @OneToMany(() => Statitics, (statistics) => statistics.schedule)
  // statistics: Statitics[];
}
