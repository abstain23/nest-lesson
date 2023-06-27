import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OooModule } from './ooo/ooo.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule, OooModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 下面这种方式也是全局的校验，但是可以进行依赖注入
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule {}
