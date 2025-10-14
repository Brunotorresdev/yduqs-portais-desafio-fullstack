import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('YDUQS Portais API')
    .setDescription('API para sistema de portais educacionais da YDUQS')
    .setVersion('1.0')
    .addTag('course-options', 'Operações relacionadas às opções de curso')
    .addTag('purchase', 'Operações relacionadas às compras')
    .addTag('client', 'Operações relacionadas aos clientes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
