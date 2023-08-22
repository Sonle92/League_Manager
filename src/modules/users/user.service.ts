import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getMyUser(token: string): Promise<any> {
    const user = this.jwtService.verify(token);
    return user;
  }

  create(createuserdto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createuserdto);
  }
  async update(id: number, createuserdto: CreateUserDto): Promise<User> {
    const a = await this.usersRepository.findOne({ where: { id } });

    if (!a) {
      throw new NotFoundException('User with ID ' + id + ' not found.');
    }
    const entityColumns = Object.keys(a);
    const updateColumns = Object.keys(createuserdto);

    const invalidColumns = updateColumns.filter(
      (column) => !entityColumns.includes(column),
    );

    if (invalidColumns.length > 0) {
      throw new NotFoundException(
        `Invalid columns: ${invalidColumns.join(', ')}`,
      );
    }
    Object.assign(a, createuserdto);
    return this.usersRepository.save(a);
  }

  async updatePass(id: number, pass: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User with ID ' + id + ' not found.');
    }
    user.password = pass;

    await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const b = await this.usersRepository.findOneBy({ id });
    if (!b) {
      throw new NotFoundException('User with ID ' + id + ' not found.');
    }
    await this.usersRepository.delete(id);
  }

  async checkMail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email is not registered');
    }
    return user.email;
  }
  async getIDMail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email is not registered');
    }
    return user.id;
  }
  async updateMyAccount(token: string, username: string): Promise<any> {
    const mytoken = this.jwtService.verify(token);
    const id = mytoken.id;
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User with ID ' + id + ' not found.');
    }
    user.username = username;
    return this.usersRepository.save(user);
  }
}
