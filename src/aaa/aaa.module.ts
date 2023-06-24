import { Global, Module } from '@nestjs/common';
import { AaaController } from './aaa.controller';
import { AaaService } from './aaa.service';

// 声明为全局模块
@Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule {}
