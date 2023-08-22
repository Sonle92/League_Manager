import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;
}
