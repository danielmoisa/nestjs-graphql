import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get<ConfigService>(ConfigService)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
