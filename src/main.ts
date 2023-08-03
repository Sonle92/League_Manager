import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './modules/teams/logger.middleware';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
