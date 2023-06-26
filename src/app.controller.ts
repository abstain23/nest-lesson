import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { AaaPipe } from './aaa.pipe';
import { AppService } from './app.service';

enum Fff {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Query(
      'aa',
      new ParseIntPipe({
        exceptionFactory(err) {
          console.log('err', err);
          throw new HttpException('err ' + err, HttpStatus.NOT_IMPLEMENTED);
        },
      }),
    )
    aa: string,
  ): string {
    console.log(typeof aa);
    return this.appService.getHello() + ' ' + aa;
  }

  @Get('cc')
  cc(@Query('cc', ParseFloatPipe) cc: number) {
    return cc + 1;
  }

  @Get('dd')
  dd(@Query('dd', ParseBoolPipe) cc: boolean) {
    return typeof cc;
  }

  @Get('ee')
  ee(
    @Query(
      'ee',
      new ParseArrayPipe({
        items: Number,
        separator: '-',
        optional: true,
      }),
    )
    ee: number[],
  ) {
    return ee?.reduce((pre, next) => pre + next, 0);
  }

  @Get('ff/:enum') // 这样只会允许enum中的value
  ff(@Param('enum', new ParseEnumPipe(Fff)) ff: Fff) {
    return ff;
  }

  @Get('gg/:uuid')
  gg(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return uuid;
  }

  @Get('hhh')
  hhh(@Query('hhh', new DefaultValuePipe('aaa')) hhh: string) {
    return hhh;
  }

  @Get('jjj/:bbb')
  jjj(@Query('aaa', AaaPipe) aaa: string, @Param('bbb', AaaPipe) bbb: number) {
    return aaa + bbb;
  }
}
