import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { requireLogin } from './custom-decorator';
import { Role } from './user/entities/role.entity';

declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const needLogin = this.reflector.getAllAndOverride(requireLogin, [
      // 优先级高的放前面
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('needLogin', needLogin);

    if (!needLogin) {
      return true;
    }

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = await this.jwtService.verifyAsync(token);
      console.log('token data', data);
      request.user = data.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
