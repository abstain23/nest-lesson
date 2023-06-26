import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    PersonModule,
    BbbModule.register({ name: 'cc' }),
    CccModule.forRoot({
      aaa: 2,
      bbb: 'bbb',
      isGlobal: true,
    }),
    // CccModule.forRootAsync({
    //   isGlobal: true,
    //   async useFactory() {
    //     await 111;
    //     return {
    //       aaa: 111,
    //       bbb: 'bbbbbb',
    //     };
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
