import { Get, Headers, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { AppService } from './app.service';
import { Bbb } from './bbb.decorator';
import { Ccc, MyHeaders, MyQuery } from './ccc.decorator';
import { Ddd } from './ddd.decorator';

@Ddd('eee', 'ccya')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('aaa', 'admin2')
  @UseGuards(AaaGuard)
  getHello(): string {
    debugger;
    return this.appService.getHello();
  }

  @Get('hello')
  @Aaa('admin222')
  @UseGuards(AaaGuard)
  getHello2(): string {
    return this.appService.getHello();
  }

  @Bbb('hello2', 'admin333')
  getHello3() {
    return this.appService.getHello();
  }

  @Get('hello3')
  getHello4(@Ccc() c) {
    return c;
  }

  @Get('hello4')
  getHello5(@MyHeaders('Accept') acc1, @Headers('Accept') acc2) {
    console.log('acc1', acc1);
    return {
      acc1,
      acc2,
    };
  }

  @Get('hello5')
  getHello6(@MyQuery('aaa') q1, @Query('bbb') q2) {
    return {
      q1,
      q2,
    };
  }
}
