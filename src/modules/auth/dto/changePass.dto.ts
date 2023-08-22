import { IsNotEmpty } from 'class-validator';
export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  newPassword: string;
}
