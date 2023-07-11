import { SetMetadata } from '@nestjs/common';

export const requireLogin = 'REQUIRE_LOGIN';
export const requirePermission = 'REQUIRE_PERMISSION';

export const RequireLogin = (flag: boolean | string = true) =>
  SetMetadata(requireLogin, flag);

export const RequirePermission = (...permissions: string[]) =>
  SetMetadata(requirePermission, permissions);
