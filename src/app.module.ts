import { Module } from '@nestjs/common';
import { MyLogger3 } from './MyLogger3';
import { AaaModule } from './aaa/aaa.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { Logger2Module } from './logger2-module/logger2-module.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    PersonModule,
    LoggerModule,
    AaaModule,
    Logger2Module.register({
      name: 'cc',
      age: 18,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MyLogger3],
})
export class AppModule {}
