import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { MyLogger3 } from './MyLogger3';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
    // logger: ['warn', 'error'],
    // logger: new MyLogger2(),
    bufferLogs: true,
  });

  app.useLogger(app.get(MyLogger3));
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
