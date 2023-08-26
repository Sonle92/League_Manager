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
  league_id: number;
}
export class CreateTeamDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Not be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Not be empty' })
  logo: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => LeagueDto)
  @IsNotEmpty()
  league: LeagueDto;
}
