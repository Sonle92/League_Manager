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
  id: string;
}
export class CreatePlayerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  playerName: string;

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
