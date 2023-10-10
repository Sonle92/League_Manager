import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
