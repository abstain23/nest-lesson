import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { requirePermission } from './custom-decorator';
import { Permission } from './user/entities/permissions.entity';
import { UserService } from './user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {

  @Inject(UserService)
  private userService: UserService

  @Inject(Reflector)
  private reflector: Reflector

 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const request: Request = context.switchToHttp().getRequest()
    console.log('login guard')

    if(!request.user) {
      return true
    }

    const roles = await this.userService.findRolesByIds(request.user.roles.map(item => item.id))

    // console.log('this.userService',this.userService)

    const permissions: Permission[] = roles.reduce((pre, next) => {
      pre.push(...next.permissions)
      return pre
    }, [])

    const needPermissions = this.reflector.getAllAndOverride<string[]>(requirePermission, [
      context.getHandler(),
      context.getClass(),
    ]) || []

    console.log('needPermissions',needPermissions)
    console.log('permissions',permissions)

    for(const per of needPermissions) {
      const isFound = permissions.find(p => p.name === per)
      if(!isFound) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    return true;
  }
}
