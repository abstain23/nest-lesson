import { Module } from '@nestjs/common';
import { BbbController } from './bbb.controller';
import { BbbService } from './bbb.service';

@Module({
  // imports: [AaaModule], 声明为全局模块后去掉
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
