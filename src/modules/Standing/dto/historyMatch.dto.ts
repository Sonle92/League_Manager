import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HistoryMatch {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  leagueId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  yard: string;
}
