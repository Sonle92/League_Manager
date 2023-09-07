import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLeagueDto } from 'src/modules/league/dto/league.dto';
class LeagueDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
export class CreateTeamDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  logo: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => LeagueDto)
  @IsNotEmpty()
  leagueId: LeagueDto;
}
