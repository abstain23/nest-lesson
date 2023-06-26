import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { AaaException } from './AaaException';

@Catch(AaaException)
export class AaaFilter implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    // ArgumentHost 是用于切换 http、ws、rpc 等上下文类型的，可以根据上下文类型取到对应的 argument。
    const type = host.getType();
    if (type === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      response.status(500).json({
        aaa: exception.aaa,
        bbb: exception.bbb,
      });
    } else if (type === 'rpc') {
    } else {
    }
  }
}
