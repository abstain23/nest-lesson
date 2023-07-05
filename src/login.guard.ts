import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorization = (request.headers['authorization'] || '') as string;
    console.log('authorization', authorization);

    const aList = authorization.split(' ');
    console.log('aList', aList);

    if (!aList || aList.length < 2) {
      throw new UnauthorizedException('token 错误');
    }

    const token = aList[1];

    try {
      const info = this.jwtService.verify(token);
      (request as any).user = info.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
