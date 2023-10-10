import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StandingYard } from '../enums/standing.enum';

export class HistoryMatch {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  leagueId: string;

  @ApiProperty({ enum: StandingYard, default: StandingYard.All })
  @IsNotEmpty()
  @IsString()
  yard: StandingYard;
}
