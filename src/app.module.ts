import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';

import { TeamsModule } from './modules/teams/teams.module';
import { TeamsController } from './modules/teams/http/controllers/teams.controller';
import { logger } from './modules/teams/midlewares/logger.middleware';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './modules/users/dto/user.dto';
import { User } from './modules/users/entities/user.entity';
import { LeagueModule } from './modules/league/league.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { UserController } from './modules/users/http/controllers/user.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { dataSourceOptions } from 'db/data-source';
import { PlayerModule } from './modules/players/players.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { StandingModule } from './modules/Standing/standing.module';
import { LeagueTeamModule } from './modules/leagueTeam/leagueTeam.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsService } from './modules/teams/teams.service';
import { LeagueService } from './modules/league/league.service';
import { PlayerService } from './modules/players/players.service';
import { StatisticModule } from './modules/statistics/statistics.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"GoalLine Team Hub" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    TeamsModule,
    UserModule,
    LeagueModule,
    PlayerModule,
    ScheduleModule,
    AuthModule,
    StandingModule,
    LeagueTeamModule,
    StatisticModule,
    UploadModule,
    ConfigModule.forRoot(),
    forwardRef(() => LeagueModule),
    forwardRef(() => TeamsModule),
    forwardRef(() => PlayerModule),
    // forwardRef(() => StatisticModule),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UserController);
  }
}
