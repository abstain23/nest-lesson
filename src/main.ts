import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  app.use(session({
    secret: 'cc--dd',
    resave: false,
    saveUninitialized: false
  }));
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
