import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { promises } from 'dns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  async update(id: number, user: Partial<User>): Promise<User> {
    const a = await this.usersRepository.findOneBy({ id });

    if (!a) {
      throw new NotFoundException('Không tìm thấy user để cập nhật.');
    }
    Object.assign(a, user);
    return this.usersRepository.save(a);
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
