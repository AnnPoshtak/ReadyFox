import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PassportJwtAuthGuard } from './auth/guards/passport-jwt.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cafe API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'bearer-auth',
    )
    .addSecurityRequirements('bearer-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  Object.values(document.paths).forEach((path: any) => {
    Object.values(path).forEach((operation: any) => {
      if (operation.security && operation['x-public']) {
        operation.security = [];
      }
    });
  });

  SwaggerModule.setup('api/docs', app, document);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new PassportJwtAuthGuard(reflector));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Server running on http://localhost:${port}`);
  console.log(`API documentation: http://localhost:${port}/api/docs`);
}
bootstrap();