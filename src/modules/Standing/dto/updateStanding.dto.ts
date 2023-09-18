import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateStandingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  homeTeamScore: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  awayTeamScore: number;
}
