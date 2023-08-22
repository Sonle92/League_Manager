import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './role.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(user);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('SECRET'),
      });
      user['user_data'] = payload;
    } catch {
      throw new HttpException(
        {
          status: 419,
          message: 'Token expired',
        },
        419,
      );
    }
    const myUser = user['user_data'];
    const hasRole = requiredRoles.some((role) => myUser.roles?.includes(role));
    if (!hasRole) {
      const allowedRoles = requiredRoles.join(', ');
      throw new ForbiddenException(
        `You don't have the required role. Allowed roles: ${allowedRoles}`,
      );
    }
    // return requiredRoles.some((role) => myUser.roles.includes(role));
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization
      ? request.headers.authorization.split(' ')
      : [];

    return type === 'Bearer' ? token : undefined;
  }
}
