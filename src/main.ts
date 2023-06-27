import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  // 如果全局的pipe没有使用依赖注入，使用这种方式也能进行全局校验
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
