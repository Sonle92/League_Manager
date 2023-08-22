import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
