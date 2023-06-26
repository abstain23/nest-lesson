import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { CccService } from './ccc.service';
import { DddService } from './ddd.service';

@Module({
  imports: [PersonModule, AaaModule, BbbModule],
  controllers: [AppController],
  providers: [AppService, CccService, DddService],
})
export class AppModule {}
