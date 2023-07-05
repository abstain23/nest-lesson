import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });

  app.use(
    session({
      secret: 'CXXT',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
