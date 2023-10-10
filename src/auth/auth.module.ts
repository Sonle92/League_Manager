import { Module } from '@nestjs/common';
import { AuthController } from './http/controllers/auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/modules/users/user.service';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: '12345',
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
