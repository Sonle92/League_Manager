import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('SECRET'),
      });
      // console.log(payload);
      request['user_data'] = payload;
    } catch {
      throw new HttpException(
        {
          status: 419,
          message: 'Token expired',
        },
        419,
      );
    }

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization
      ? request.headers.authorization.split(' ')
      : [];

    return type === 'Bearer' ? token : undefined;
  }
}
