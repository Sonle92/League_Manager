import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UploadLogoTeam {
  @ApiHideProperty()
  id: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  logo: Express.Multer.File;
}
