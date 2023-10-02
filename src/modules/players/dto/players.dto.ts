import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
export class CreatePlayerDto {
  @ApiHideProperty()
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
  @IsNotEmpty()
  teamId: string;
}
