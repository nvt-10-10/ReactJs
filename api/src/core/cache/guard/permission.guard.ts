import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheService } from '../cache.service';
import { UserService } from '../../../modules/users/services/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<number[]>(
      'permissions',
      context.getHandler(),
    );
    if (
      !requiredPermissions ||
      (requiredPermissions && requiredPermissions.includes(999))
    ) {
      return true;
    }

    console.log('abc', {
      check:
        !requiredPermissions ||
        (requiredPermissions && requiredPermissions.includes(999)),
      requiredPermissions,
    });

    const request = context.switchToHttp().getRequest();
    const userId = request?.user?.id || -1;
    const cacheKey = `user:${userId}:permissions`;
    let permissions: any[] =
      (await this.cacheService.get<any[]>(cacheKey)) || [];
    console.log({ permissions, requiredPermissions });

    if (!permissions || permissions?.length == 0) {
      permissions = await this.userService.getPermissionsByUserId(userId);
      await this.cacheService.set(cacheKey, permissions);
    }
    for (const permission of requiredPermissions) {
      const check = await this.checkPermission(permission, permissions);
      if (check) return true;
    }
    return false;
  }

  async checkPermission(permission, permissions) {
    for (const element of permissions) {
      if (element?.id == permission) {
        return true;
      }
    }

    return false;
  }
}
