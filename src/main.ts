import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });

  const config = new DocumentBuilder()
    .setTitle('Test Example')
    .setDescription('The Api Desc')
    .setVersion('1.0')
    .addTag('test_tag')
    .addBasicAuth({
      type: 'http',
      name: 'basic',
      description: '用户名 + 密码'
    })
    .addCookieAuth('session_id', {
      type: 'apiKey',
      name: 'cookie',
      description: '基于cookie的认证'
    })
    .addBearerAuth({
      type: 'http',
      description: '基于jwt的认证',
      name: 'bearer'
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
