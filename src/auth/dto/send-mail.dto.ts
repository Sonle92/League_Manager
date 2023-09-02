import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class SendMailDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;
}
