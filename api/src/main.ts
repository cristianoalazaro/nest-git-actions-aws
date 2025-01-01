import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('API Rest NestJS')
    .addBearerAuth()
    .setVersion('1.0')
    .build()

  const document = () => SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, () => console.log(`Link da doc: http://localhost:3000/api`));
}
bootstrap();
