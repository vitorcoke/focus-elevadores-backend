import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { UserPermissions } from 'src/app/users/enums/user-permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<UserPermissions[]>(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (permissions.includes(user.permission)) return true;
    else throw new UnauthorizedException();
  }
}
