import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { TeamsModule } from './modules/teams/teams.module';
import { TeamsController } from './modules/teams/teams.controller';
import { logger } from './modules/teams/logger.middleware';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './modules/users/dto/create-user.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'job',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TeamsModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(TeamsController);
  }
}
