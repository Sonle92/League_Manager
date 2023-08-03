import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @Column()
  job: string;

  @Column()
  completed: boolean;
}
