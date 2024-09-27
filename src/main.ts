import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //* For DTO Validations
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //* For Documentation 
  const config = new DocumentBuilder()
    .setTitle('Interactive Posts Endpoints for Social Pipper!')
    .setDescription('Welcome to the Pipper-Project Posts Microservice documentation!')
    .setVersion('0.5')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
