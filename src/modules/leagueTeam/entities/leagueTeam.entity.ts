import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from 'src/modules/league/entities/league.entity';
import { Team } from 'src/modules/teams/entities/teams.entity';

@Entity({ name: 'leagueteam' })
export class LeagueTeam {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  leagueId: string;

  @Column()
  teamId: string;

  @ManyToOne(() => Team, (team) => team.league, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id', referencedColumnName: 'id' }])
  team: Team;

  @ManyToOne(() => League, (league) => league.team, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id', referencedColumnName: 'id' }])
  league: League;
}
