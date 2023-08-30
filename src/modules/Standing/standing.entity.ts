import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { League } from '../league/league.entity';
import { Team } from '../teams/teams.entity';

@Entity()
export class Standing {
  @PrimaryGeneratedColumn()
  standing_id: number;

  @Column()
  goal_Difference: number;

  @Column()
  played: number;

  @Column()
  point: number;

  @Column()
  number_goals: number;

  @Column()
  conceded_goals: number;

  @ManyToOne(() => League, (league) => league.standing)
  league: League;

  @OneToOne(() => Team, (team) => team.standing)
  @JoinColumn()
  team: Team;
}
