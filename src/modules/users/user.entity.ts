import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'Tên người dùng không được chứa số' })
  @IsNotEmpty()
  @Matches(/^[^\d]+$/)
  name: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  age: number;

  @Column()
  @IsNotEmpty()
  address: string;
}
