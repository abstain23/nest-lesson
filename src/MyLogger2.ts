import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger2 extends ConsoleLogger {
  @Inject('LOG_OPTIONS')
  public options: Record<string, any>;

  log(message: string, context: string) {
    console.log('this.options', this.options);
    console.log(`[${context}]`, message);
  }
}
