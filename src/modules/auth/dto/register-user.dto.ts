import { IsNotEmpty, IsString, Matches } from 'class-validator';
export class RegisterUserDto {
  @IsString({ message: 'Username cannot contain numbers' })
  @IsNotEmpty({ message: 'You have not entered email' })
  @Matches(/^[^\d]+$/)
  username: string;

  @IsNotEmpty({ message: 'You have not entered email' })
  email: string;

  @IsNotEmpty({ message: 'you have not entered password' })
  password: string;

  role: string;

  status: number;
}
