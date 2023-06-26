import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  // 全局的拦截器无法注入依赖
  // app.useGlobalInterceptors(new AaaInterceptor());
  await app.listen(3000);
}
bootstrap();
