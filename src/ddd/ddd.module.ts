import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { DddController } from './ddd.controller';
import { DddService } from './ddd.service';

@Module({
  controllers: [DddController],
  providers: [DddService],
})
export class DddModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  onModuleInit() {
    console.log('DddModule moduleInit');
  }

  onApplicationBootstrap() {
    console.log('DddModule onApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log('DddModule onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('DddModule beforeApplicationShutdown', signal);
  }
}
