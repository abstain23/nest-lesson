import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AaaController } from './aaa.controller';
import { AaaService } from './aaa.service';

@Module({
  controllers: [AaaController],
  providers: [AaaService],
  imports: [UserModule]
})
export class AaaModule {}
