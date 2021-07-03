import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Role } from '../constant';
import { ICurrentUser } from '../interfaces/ICurrentUser';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: ICurrentUser = request.user;

    return user.role === Role.ADMIN;
  }
}
