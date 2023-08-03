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
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll() {
    const response = await this.usersService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return response;
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = await this.usersService.findOne(id);
    if (!response) {
      throw new HttpException(
        'Không tìm thấy đối tượng.',
        HttpStatus.NOT_FOUND,
      );
    }
    return response;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    if (!response) {
      throw new HttpException(
        'Lỗi không thể gửi dữ liệu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return response;
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createUserDto: Partial<CreateUserDto>,
  ): Promise<CreateUserDto> {
    return this.usersService.update(id, createUserDto);
  }
  @Delete('id')
  async delete(@Param('id') id: number) {
    const response = await this.usersService.remove(id);
    return response;
  }
}
