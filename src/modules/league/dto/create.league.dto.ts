import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLeagueDto {
  @ApiProperty()
  league_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  league_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sport: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;
}
