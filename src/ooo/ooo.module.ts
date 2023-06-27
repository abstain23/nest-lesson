import { Module } from '@nestjs/common';
import { OooController } from './ooo.controller';
import { OooService } from './ooo.service';

@Module({
  controllers: [OooController],
  providers: [
    OooService,
    {
      provide: 'validation_options',
      useValue: {
        name: 'cc',
      },
    },
  ],
})
export class OooModule {}
