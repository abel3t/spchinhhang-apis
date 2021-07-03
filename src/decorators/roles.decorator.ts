import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { Role } from '../constant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
