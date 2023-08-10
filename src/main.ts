import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { NextFunction, Request, Response, json, urlencoded } from 'express';
import { AppModule } from './app.module';

const PORT = process.env.PORT_SERVER || 3333;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  app.use(json({ limit: '3000mb' }));
  app.use(urlencoded({ extended: true, limit: '3000mb' }));

  app.useGlobalPipes(new ValidationPipe());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.endsWith('.jpg') || req.originalUrl.endsWith('.json')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
    next();
  });

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
