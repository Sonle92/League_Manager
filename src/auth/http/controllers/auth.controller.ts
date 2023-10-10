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
import { RegisterUserDto } from '../../dto/registerUser.dto';
import { AuthService } from '../../auth.service';
import { User } from 'src/modules/users/entities/user.entity';
import { LoginUserDto } from '../../dto/loginUser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ChangePasswordDto } from '../../dto/changePass.dto';
import { Auth } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Response, Request } from 'express';
import { ForgotDto } from '../../dto/forgot.dto';
import { ApiTags } from '@nestjs/swagger';
import { SendMailDto } from '../../dto/sendMail.dto';
import * as cookie from 'cookie';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth-Register-Login-Logout-ChangePassword-ForgotPassword')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @UsePipes(ValidationPipe)
  async register(
    @Body(new ValidationPipe()) registerUserDto: RegisterUserDto,
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
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    const user = await this.authService.login(loginUserDto);
    return res.json({ user });
  }
  @Post('refresh-token')
  refreshToken(@Body() { RefreshToken }): Promise<any> {
    console.log('refresh token api');
    return this.authService.refreshToken(RefreshToken);
  }

  @Put('change-password')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
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
  async email(@Body(new ValidationPipe()) sendMmailDto: SendMailDto) {
    return await this.authService.sendWelcomeEmail(sendMmailDto.email);
  }

  @Put('forgot-password')
  @UsePipes(ValidationPipe)
  async forgot(@Body(new ValidationPipe()) forgotDto: ForgotDto) {
    return await this.authService.ResetPassword(
      forgotDto.token,
      forgotDto.password,
    );
  }
  @Delete('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('AccessToken', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/login',
    });

    return res.json({ message: 'Logged out successfully' });
  }
}
