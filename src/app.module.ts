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
import { TodoModule } from './modules/todolist/todolist.module';
import { Todo } from './modules/todolist/todo.entity';
import { User } from './modules/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'Nestjs',
      autoLoadEntities: true,
      logging: false,
      entities: [Todo],
      migrations: [],
      subscribers: [],
      synchronize: true,
    }),
    TeamsModule,
    UserModule,
    TodoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(TeamsController);
  }
}
