import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      const messages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      );
      return new BadRequestException(messages);
    },
  }));

  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('YDUQS Portais API')
    .setDescription(`API para sistema de portais educacionais da YDUQS.
    
    Esta API fornece endpoints para:
    - Consulta de opções de cursos disponíveis
    - Gestão de matrículas e compras
    - Cadastro e gerenciamento de clientes
    
    Todas as mensagens de erro são retornadas em português do Brasil.`)
    .setVersion('1.0')
    .addTag('course-options', 'Listagem e consulta de cursos disponíveis, valores e turnos')
    .addTag('purchase', 'Criação e gestão de matrículas/compras')
    .addTag('client', 'Gerenciamento de dados dos clientes')
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
