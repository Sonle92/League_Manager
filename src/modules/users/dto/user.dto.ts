import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString({ message: 'Tên người dùng không được chứa số' })
  @IsNotEmpty()
  @Matches(/^[^\d]+$/)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  role: string;
}
