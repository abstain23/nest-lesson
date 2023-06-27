import { DynamicModule, Module } from '@nestjs/common';
import { MyLogger2 } from 'src/MyLogger2';

@Module({})
export class Logger2Module {
  static register(options): DynamicModule {
    return {
      module: Logger2Module,
      providers: [
        MyLogger2,
        {
          provide: 'LOG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [MyLogger2, 'LOG_OPTIONS'],
    };
  }
}
