import {
  IsString,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLeagueDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sport: string;

  @ApiProperty()
  @IsNotEmpty()
  // @IsDateString()
  startDate: string;
  // startDate: number;

  @ApiProperty()
  @IsNotEmpty()
  // @IsDateString()
  endDate: string;
  // endDate: number;
}
