import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AaaException } from './AaaException';
import { AaaFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import { AppService } from './app.service';
import { Role } from './role';
import { Roles } from './role.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(AaaFilter)
  @UseGuards(AaaGuard)
  @Roles(Role.Admin)
  getHello(): string {
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
