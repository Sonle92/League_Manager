import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(CreateUserDto)
    private usersRepository: Repository<CreateUserDto>,
  ) {}

  findAll(): Promise<CreateUserDto[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<CreateUserDto | null> {
    return this.usersRepository.findOneBy({ id });
  }
  create(user: CreateUserDto): Promise<CreateUserDto> {
    return this.usersRepository.save(user);
  }
  async update(id: number, user: CreateUserDto): Promise<void> {
    await this.usersRepository.update(id, user);
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
