import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreateLeagueDto } from 'src/modules/league/dto/league.dto';
class LeagueDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
export class CreateTeamDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  logo: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  leagueId: string;
}
