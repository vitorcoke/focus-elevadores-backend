import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3333);
}
bootstrap();
