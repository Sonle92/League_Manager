import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Param,
  UseGuards,
  Req,
  Headers,
  Put,
  Delete,
  ExecutionContext,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '../roles/auth.guard';
import { ChangePasswordDto } from './dto/changePass.dto';
import { Auth } from '../roles/role.decorator';
import { Role } from '../roles/role.enum';
import { Response, Request } from 'express';
import { ForgotDto } from './dto/forgot.dto';
import { ApiTags } from '@nestjs/swagger';
import { SendMailDto } from './dto/send-mail.dto';
import * as cookie from 'cookie';

@ApiTags('Auth-Register-Login-Logout-ChangePassword-ForgotPassword')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @UsePipes(ValidationPipe)
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res,
  ): Promise<User> {
    console.log(registerUserDto);
    const result = await this.authService.register(registerUserDto);
    if (!result) {
      throw new HttpException(
        'Error cannot send data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const response = {
      message: 'CREATE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.CREATED).json(response);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    const user = await this.authService.login(loginUserDto);
    return res.json({ user });
  }
  @Post('refresh-token')
  refreshToken(@Body() { refresh_token }): Promise<any> {
    console.log('refresh token api');
    return this.authService.refreshToken(refresh_token);
  }

  @Put('change-password')
  @UsePipes(ValidationPipe)
  @Auth(Role.Manager, Role.Admin, Role.User)
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    const id = req.user_data.id;
    const user = await this.authService.changePasssword(id, changePasswordDto);
    return user;
  }

  @Post('email')
  async email(@Body() sendMmailDto: SendMailDto) {
    return await this.authService.sendWelcomeEmail(sendMmailDto.email);
  }

  @Put('forgot-password')
  @UsePipes(ValidationPipe)
  async forgot(@Body() forgotDto: ForgotDto) {
    return await this.authService.ResetPassword(
      forgotDto.token,
      forgotDto.password,
    );
  }
  @Delete('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/login',
    });

    return res.json({ message: 'Logged out successfully' });
  }
}
