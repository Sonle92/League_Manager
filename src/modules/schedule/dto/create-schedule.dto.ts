import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
class TeamDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
class LeagueDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
export class CreateScheduleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  venue: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => TeamDto)
  @IsNotEmpty()
  homeTeam: TeamDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => TeamDto)
  @IsNotEmpty()
  awayTeam: TeamDto;

  @ApiProperty()
  @IsNotEmpty()
  homeTeamScore: number;

  @ApiProperty()
  @IsNotEmpty()
  awayTeamScore: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => LeagueDto)
  @IsNotEmpty()
  league: LeagueDto;
}
