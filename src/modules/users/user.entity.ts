import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString({ message: 'Tên người dùng không được chứa số' })
  @IsNotEmpty()
  @Matches(/^[^\d]+$/)
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true, default: null })
  refresh_token: string;
}
