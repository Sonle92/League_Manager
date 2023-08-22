import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config/dist';
import { AuthService } from '../auth/auth.service';
@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UsersService, AuthService],
})
export class UserModule {}
