import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ccCc',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
