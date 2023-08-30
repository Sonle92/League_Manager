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
import { Team } from '../teams/teams.entity';
import { ScheduleMatch } from '../schedule/schedule.entity';
import { Standing } from '../Standing/standing.entity';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  sport: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @ManyToMany(() => Team, (team) => team.league)
  @JoinTable({
    name: 'league_team',
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

  @OneToMany(() => ScheduleMatch, (schedule) => schedule.league)
  shedule: ScheduleMatch[];

  @OneToMany(() => Standing, (standing) => standing.league)
  standing: Standing[];
}
