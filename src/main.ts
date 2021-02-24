import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { entityNotFoundExceptionFilter } from './exceptionFilters/entityNotFound.exceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new entityNotFoundExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Nest.js - Base API')
    .setDescription('Documentation Example')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
