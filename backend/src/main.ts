import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('app.port');
  
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap().catch((error) => {
  Logger.error('Bootstrap failed', error);
  process.exit(1);
});
