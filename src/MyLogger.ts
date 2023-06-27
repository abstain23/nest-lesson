import { Inject, Injectable, LoggerService, Optional } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  // 这个注入无效
  @Optional()
  @Inject('LOG_OPTIONS')
  private options: Record<string, any>;

  log(message: string, context: string) {
    console.log('this.options', this.options);
    console.log(`---log---[${context}]---`, message);
  }

  error(message: string, context: string) {
    console.log(`---error---[${context}]---`, message);
  }

  warn(message: string, context: string) {
    console.log(`---warn---[${context}]---`, message);
  }
}
