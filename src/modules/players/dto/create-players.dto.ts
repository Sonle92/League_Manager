import {
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
export class CreatePlayerDto {
  @ApiProperty()
  player_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  player_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  poisition: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => TeamDto)
  @IsNotEmpty()
  team: TeamDto;
}
