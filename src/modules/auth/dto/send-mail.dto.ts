import { IsEmail, IsNotEmpty } from 'class-validator';
export class SendMailDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;
}
