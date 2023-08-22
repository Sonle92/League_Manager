import { IsEmpty, IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotDto {
  @IsNotEmpty({ message: 'Token is not empty' })
  token: string;

  @IsNotEmpty({ message: 'Password is not empty' })
  password: string;
}
