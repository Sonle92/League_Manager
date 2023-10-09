import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampTransformer } from '../transformers/timestamp.transformer';
import { Statistics } from './statistics.entity';

@Entity()
export class GoalEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'integer' })
  minute: number;

  @ManyToOne(() => Statistics, (statistics) => statistics.goals)
  statistic: Statistics;

  //   @ManyToOne(() => Player, (player) => player.goals)
  //   scorer: Player;

  //   @ManyToOne(() => Team, (team) => team.goals)
  //   team: Team;
}
