import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/teams.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Standing } from '../../Standing/entities/standing.entity';
import { LeagueTeam } from 'src/modules/leagueTeam/entities/leagueTeam.entity';
import { TimestampTransformer } from 'src/modules/statistics/transformers/timestamp.transformer';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  sport: string;

  @Column({ type: 'timestamp', transformer: new TimestampTransformer() })
  startDate: number;

  @Column({ type: 'timestamp', transformer: new TimestampTransformer() })
  endDate: number;

  @ManyToMany(() => Team, (team) => team.league)
  @JoinTable({
    name: 'leagueteam',
    joinColumn: {
      name: 'leagueId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teamId',
      referencedColumnName: 'id',
    },
  })
  team: Team[];

  @OneToMany(() => Schedule, (schedule) => schedule.league)
  shedule: Schedule[];

  @OneToMany(() => Standing, (standing) => standing.league)
  standing: Standing[];
}
