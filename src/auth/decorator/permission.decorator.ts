import { SetMetadata } from '@nestjs/common';
import { UserPermissions } from 'src/app/users/enums/user-permissions.enum';

export const HasPermissions = (permissions: UserPermissions[]) => {
  return SetMetadata('permission', permissions);
};
