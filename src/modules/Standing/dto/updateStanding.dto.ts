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
  @IsNumber()
  rank: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  played: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  points: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  matchesWon: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  matchesDrawn: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  matchesLost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalGoals: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalGoalsConceded: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  goalDifference: number;
}
