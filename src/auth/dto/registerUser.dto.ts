import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
export class RegisterUserDto {
  @ApiProperty()
  @IsString({ message: 'Username cannot contain numbers' })
  @IsNotEmpty({ message: 'You have not entered email' })
  @Matches(/^[^\d]+$/)
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'You have not entered email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'you have not entered password' })
  password: string;

  role: string;
}
