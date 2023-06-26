import { DynamicModule, Module } from '@nestjs/common';
import { BbbController } from './bbb.controller';
import { BbbService } from './bbb.service';

// 动态模块
@Module({
  // controllers: [BbbController],
  // providers: [BbbService]
})
export class BbbModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: BbbModule,
      controllers: [BbbController],
      providers: [
        BbbService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
