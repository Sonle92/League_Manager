import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HistoryScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  teamId: string;
}
