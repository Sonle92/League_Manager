import {
  IsString,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLeagueDto {
  @ApiHideProperty()
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
  @IsNumber()
  startDate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  endDate: number;
}
