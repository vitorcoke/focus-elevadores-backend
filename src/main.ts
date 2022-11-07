import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './app.module';

const PORT = process.env.PORT_SERVER || 3333;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Focus Elevadores API')
    .setDescription('Api da interdace Focus Elevadores')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      targsSorter: 'Focus',
      operationSorter: 'Focus',
    },
  });

  await app.listen(PORT);
}
bootstrap();
