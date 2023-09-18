import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
class LeagueDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
class TeamDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
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
  @ValidateNested()
  @Type(() => LeagueDto)
  @IsNotEmpty()
  league: LeagueDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => TeamDto)
  @IsNotEmpty()
  team: TeamDto;
}
