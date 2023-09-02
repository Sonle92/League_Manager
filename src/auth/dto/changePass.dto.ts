import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password cannot be empty' })
  newPassword: string;
}
