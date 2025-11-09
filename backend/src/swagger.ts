import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);

  const swaggerConfig = {
    title: configService.getOrThrow<string>('docs.title'),
    description: configService.getOrThrow<string>('docs.description'),
    version: configService.getOrThrow<string>('docs.version'),
    tag: configService.getOrThrow<string>('docs.tag'),
  };

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
