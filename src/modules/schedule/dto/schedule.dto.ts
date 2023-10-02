import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  dateTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  venue: string;

  @ApiProperty()
  @IsNotEmpty()
  homeTeamId: string;

  @ApiProperty()
  @IsNotEmpty()
  awayTeamId: string;

  @ApiProperty({ default: null })
  homeTeamScore: number;

  @ApiProperty({ default: null })
  awayTeamScore: number;

  @ApiProperty()
  @IsNotEmpty()
  leagueId: string;
}
