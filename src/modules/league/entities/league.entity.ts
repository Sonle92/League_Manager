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
import { Standing } from '../../Standing/standing.entity';
import { LeagueTeam } from 'src/modules/leagueTeam/entities/leagueTeam.entity';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  sport: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

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
