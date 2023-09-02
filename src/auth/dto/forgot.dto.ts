import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Token is not empty' })
  token: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is not empty' })
  password: string;
}
