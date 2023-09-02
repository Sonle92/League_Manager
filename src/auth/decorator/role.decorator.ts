import { SetMetadata, applyDecorators } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../http/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../http/guards/role.guard';

export const ROLES_KEY = 'roles';
export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
