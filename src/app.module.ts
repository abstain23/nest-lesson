import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [
    // AppService 是下面的简写
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      // provider的token 如果是字符串token的话需要手动注入(构造函数里面)
      // class 做 token 可以省去 @Inject，比较简便。
      provide: 'app_service',
      useClass: AppService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'cc',
        age: 18,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'dd',
          age: 20,
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        console.log('factory');
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      //  inject 声明了两个 token，一个是字符串 token 的 person，一个是 class token 的 AppService。
      inject: ['person', AppService],
    },
    {
      provide: 'person4',
      async useFactory() {
        await new Promise((r) => {
          setTimeout(r, 1000);
        });
        return {
          name: 'person4',
          age: 22,
        };
      },
    },
    {
      provide: 'person5',
      useExisting: 'person3',
    },
  ],
})
export class AppModule {}
