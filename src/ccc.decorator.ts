import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc';
  },
);

export const MyHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    // console.log('request.headers', request.headers);
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);

export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // console.log('request', request);
    console.log('request.query', request.query);
    return request.query[key];
  },
);
