import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private configService: ConfigService

  @Get()
  getHello(): string {
    console.log("this.configService.get('aaa')",this.configService.get('application'))
    console.log("this.configService.get('bbb')",this.configService.get('aaa'))
    return this.appService.getHello();
  }
}
