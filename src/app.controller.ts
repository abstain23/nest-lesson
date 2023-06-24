import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 构造器的注入方式
  // constructor(private readonly appService: AppService) {}

  // 同上的作用一致
  // @Inject(AppService)
  // private readonly appService: AppService;

  @Inject('app_service')
  private readonly appService: AppService;

  @Inject('person')
  private readonly person: { name: string; age: string };

  @Inject('person2')
  private readonly person2: { name: string; age: string };

  @Inject('person3')
  private readonly person3: { name: string; age: string };

  @Inject('person4')
  private readonly person4: { name: string; age: string };

  @Inject('person5')
  private readonly person5: { name: string; age: string };

  @Get()
  getHello(): string {
    // debugger;
    console.log(this.person);
    console.log('this.person2', this.person2);
    console.log('this.person3', this.person3);
    console.log('this.person4', this.person4);
    console.log('this.person5', this.person5);
    return this.appService.getHello();
  }
}
