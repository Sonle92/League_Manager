import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { League } from '../../league/entities/league.entity';
import { Team } from '../../teams/entities/teams.entity';

@Entity()
export class Standing {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rank: number;

  @Column()
  played: number;

  @Column()
  points: number;

  @Column()
  matchesWon: number;

  @Column()
  matchesDrawn: number;

  @Column()
  matchesLost: number;

  @Column()
  totalGoals: number;

  @Column()
  totalGoalsConceded: number;

  @Column()
  goalDifference: number;

  @Column()
  leagueId: string;

  @Column()
  teamId: string;

  @ManyToOne(() => League, (league) => league.standing)
  league: League;

  @ManyToOne(() => Team, (team) => team.standing)
  @JoinColumn()
  team: Team;
}
