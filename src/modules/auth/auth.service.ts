import {
  Injectable,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/changePass.dto';
import { UsersService } from '../users/user.service';
import { Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { ForgotDto } from './dto/forgot.dto';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
    private mailerService: MailerService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashPassword = await this.hashPassword(registerUserDto.password);

    return await this.usersRepository.save({
      ...registerUserDto,
      refresh_token: 'refresh token string',
      password: hashPassword,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        'Email/Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      pass: user.password,
      roles: user.role,
    };

    const generatetoken = await this.generateToken(payload);
    const message = 'LOGIN SUCCESS';
    return { message, generatetoken };
    // return this.generateToken(payload);
  }

  private async generateToken(payload: { id: string; email: string }) {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN'),
    });
    await this.usersRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );
    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('SECRET'),
      });
      const checkExistToken = await this.usersRepository.findOneBy({
        email: verify.email,
        refresh_token,
      });
      if (checkExistToken) {
        return this.generateToken({
          id: verify.id,
          email: verify.email,
        });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async changePasssword(
    id: string,
    changePassswordDto: ChangePasswordDto,
  ): Promise<any> {
    const user = await this.usersService.findOne(id);
    const hashNewPassword = await this.hashPassword(
      changePassswordDto.newPassword,
    );
    const checkPass = await bcrypt.compare(
      changePassswordDto.password,
      user.password,
    );
    if (!checkPass) {
      throw new HttpException(
        'Email/Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const pass = hashNewPassword;
    await this.usersService.updatePass(id, pass);
    return { message: 'Change Password out successfully' };
  }

  async sendWelcomeEmail(email: string) {
    const getEmail = await this.usersService.checkMail(email);
    const token = await this.jwtService.signAsync(
      { getEmail },
      {
        expiresIn: '300s',
      },
    );
    await this.mailerService.sendMail({
      to: getEmail,
      subject: 'Reset your password',
      template: './confirmation',
      context: { token },
    });

    return { message: 'Email sent successfully' };
  }
  async ResetPassword(token: string, password: string): Promise<any> {
    const hashNewPassword = await this.hashPassword(password);
    const decodedToken = this.jwtService.verify(token);
    const userEmail = decodedToken.getEmail;
    const getEmail = await this.usersService.checkMail(userEmail);
    const getIdformEmail = await this.usersService.getIDMail(getEmail);

    if (!getEmail) {
      throw new UnauthorizedException('ERROR');
    }
    await this.usersService.updatePass(getIdformEmail, hashNewPassword);
    return { message: 'Reset Password out successfully' };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
