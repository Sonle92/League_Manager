import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
} from 'class-validator';

export class CreateLeagueTeamDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  leagueId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamId: string;
}
