import { SetMetadata, applyDecorators } from '@nestjs/common';
import { Role } from './role.enum';
import { AuthGuard } from './auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './role.guard';

export const ROLES_KEY = 'roles';
export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
