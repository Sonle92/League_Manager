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
  id: number;
}
class LeagueDto {
  @ApiProperty()
  @IsNotEmpty()
  league_id: number;
}
export class CreateScheduleMatchDto {
  @ApiProperty()
  schedule_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start_time: string;

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
  @ValidateNested()
  @Type(() => LeagueDto)
  @IsNotEmpty()
  league: LeagueDto;
}
