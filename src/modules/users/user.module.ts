import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './http/controllers/user.controller';
import { ConfigModule } from '@nestjs/config/dist';
import { AuthService } from 'src/auth/auth.service';
@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UsersService, AuthService],
})
export class UserModule {}
