import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CatchErrorTestInterceptor } from './catch-error-test.interceptor';
import { MapTestInterceptor } from './map-test.interceptor';
import { TapTestInterceptor } from './tap-test.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';

@Controller()
// @UseInterceptors(AaaInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(MapTestInterceptor)
  getHello(): string {
    debugger;
    return this.appService.getHello();
  }

  @Get('bbb')
  @UseInterceptors(TapTestInterceptor)
  bbb() {
    return 'bb';
  }

  @Get('ccc')
  @UseInterceptors(CatchErrorTestInterceptor)
  ccc() {
    throw new Error('xxxx');
    return 'cccc';
  }

  @Get('ddd')
  @UseInterceptors(TimeoutInterceptor)
  async ddd() {
    await new Promise((r) => setTimeout(r, 4100));
    return 'ddd';
  }

  @Get('eee')
  eee() {
    return 'ee';
  }
}
