import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { logger } from './modules/teams/logger.middleware';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs example')
    .setDescription('The API Nestjs description')
    .setVersion('1.0')
    .addTag('API PRO')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cors());
  app.use(logger);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
