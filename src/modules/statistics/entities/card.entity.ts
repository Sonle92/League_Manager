import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampTransformer } from '../transformers/timestamp.transformer';
import { Statistics } from './statistics.entity';

@Entity()
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'integer' })
  minute: number;

  @Column()
  redCard: boolean;

  @Column()
  yellowCard: boolean;

  @ManyToOne(() => Statistics, (statistics) => statistics.cards)
  statistic: Statistics;

  // @ManyToOne(() => Player, (player) => player.goals)
  // scorer: Player;

  //   @ManyToOne(() => Team, (team) => team.goals)
  //   team: Team;
}
