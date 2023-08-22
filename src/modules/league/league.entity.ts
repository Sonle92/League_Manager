import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  league_id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  league_name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  sport: string;

  @Column({ type: 'date' })
  @IsNotEmpty()
  start_date: Date;

  @Column({ type: 'date' })
  @IsNotEmpty()
  end_date: Date;
}
