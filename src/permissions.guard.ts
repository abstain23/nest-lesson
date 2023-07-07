import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RedisService } from './redis/redis.service';
import { UserService } from './user/user.service';


@Injectable()
export class PermissionGuard implements CanActivate {

  @Inject(UserService) 
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector

  @Inject(RedisService)
  private redisService: RedisService

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;
    if(!user) {
      throw new UnauthorizedException('用户未登录');
    }

    let permissions = await this.redisService.listGet(`user_${user.username}_permission`)
    
    if(!permissions || !permissions.length) {
      const foundUser = await this.userService.findByUsername(user.username);
      permissions = foundUser.permissions.map(item => item.name)
      this.redisService.listSet(`user_${user.username}_permission`, permissions, 60 * 5)
    }

    
    const per = this.reflector.get('permissions', context.getHandler())
   

    if(permissions.some(item => per === item)) {
      return true
    }

    throw new ForbiddenException('没有权限访问此接口')
  }
}
