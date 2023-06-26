import { Controller, Get, Inject } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './ccc.module-definition';

@Controller('ccc')
export class CccController {
  @Inject(MODULE_OPTIONS_TOKEN)
  private options: typeof OPTIONS_TYPE;

  // @Inject(ASYNC_OPTIONS_TYPE)
  // private asyncOptions: CccModuleOptions;

  @Get()
  hello() {
    console.log('this.options', this.options);
    // console.log('this.asyncOptions', this.asyncOptions);
    return 'ccc hello';
  }
}
