// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // --- Swagger config ---
  const config = new DocumentBuilder()
    .setTitle('Northwind API')
    .setDescription('API académica con NestJS + TypeORM + MySQL. CRUDs y Auth con JWT.')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token', // nombre del esquema (úsalo en @ApiBearerAuth)
    )
    .addServer('https://northwind-hgwy.vercel.app', 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Northwind API Docs',
  });
  // --- fin Swagger ---

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
