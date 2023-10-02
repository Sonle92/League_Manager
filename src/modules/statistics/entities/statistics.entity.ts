import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';
import { TimestampTransformer } from '../transformers/timestamp.transformer';

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  date: number;
}
