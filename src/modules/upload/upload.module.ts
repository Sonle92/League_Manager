import { Module, forwardRef } from '@nestjs/common';
import { FilesAzureService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [ConfigModule.forRoot(), forwardRef(() => TeamsModule)],

  providers: [FilesAzureService],
  exports: [FilesAzureService],
})
export class UploadModule {}
