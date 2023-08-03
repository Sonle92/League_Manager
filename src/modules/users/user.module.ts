import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
@Module({
  imports: [TypeOrmModule.forFeature([CreateUserDto])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
