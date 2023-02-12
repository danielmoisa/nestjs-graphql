import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(cookieParser());
  app.enableCors({
    origin: [config.get("clientUrl")!, config.get("apolloPlaygroundUrl")!],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
