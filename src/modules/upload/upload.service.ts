import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesAzureService {
  constructor(private readonly configService: ConfigService) {}
  private containerName: string;

  private async getBlobServiceInstance() {
    const connectionString = this.configService.get('CONNECTION_STRING');
    const blobClientService = await BlobServiceClient.fromConnectionString(
      connectionString,
    );
    return blobClientService;
  }

  private async getBlobClient(imageName: string): Promise<BlockBlobClient> {
    const blobService = await this.getBlobServiceInstance();
    const containerName = this.containerName;
    const containerClient = blobService.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);

    return blockBlobClient;
  }

  public async uploadFile(file: Express.Multer.File, containerName: string) {
    this.containerName = containerName;
    const extension = file.originalname.split('.').pop();
    const file_name = uuidv4() + '.' + extension;
    const blockBlobClient = await this.getBlobClient(file_name);
    const fileUrl = blockBlobClient.url;
    await blockBlobClient.uploadData(file.buffer);

    return fileUrl;
  }
}
