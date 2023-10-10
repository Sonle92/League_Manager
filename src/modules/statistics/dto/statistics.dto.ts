import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadedFileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  date: number;
}
