import { Module } from '@nestjs/common';
import { AaaModule } from './aaa/aaa.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';
import { DddModule } from './ddd/ddd.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule, AaaModule, BbbModule, DddModule, CccModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
