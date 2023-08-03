import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll() {
    const response = await this.usersService.findAll();
    return response;
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.usersService.findOne(id);
    return response;
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return { message: 'Tạo mới thành công!' };
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() CreateUserDto: CreateUserDto) {
    const response = await this.usersService.update(id, CreateUserDto);
    return response;
  }
  @Delete('id')
  async delete(@Param('id') id: number) {
    const response = await this.usersService.remove(id);
    return response;
  }
}
