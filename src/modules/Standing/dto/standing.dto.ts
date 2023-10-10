import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateStandingDto {
  @ApiProperty()
  id: string;

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

  @ApiProperty()
  @IsNotEmpty()
  leagueId: string;

  @ApiProperty()
  @IsNotEmpty()
  teamId: string;
}
