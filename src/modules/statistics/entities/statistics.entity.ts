import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TimestampTransformer } from '../transformers/timestamp.transformer';
import { GoalEntity } from './goal.entity';
import { CardEntity } from './card.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => GoalEntity, (goal) => goal.statistic)
  goals: GoalEntity[];

  @OneToMany(() => CardEntity, (goal) => goal.statistic)
  cards: CardEntity[];
}
