import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ApiConfigService } from './configuration/ApiConfigService';
import { DataLoader } from './fakedb/data-loader.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // load Data
  const dataLoader = app.get(DataLoader);
  await dataLoader.loadData();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Mutation API')
    .setDescription('API de consultation et de validation des résultats de mutation d\'un patient')
    .setVersion('1.0')
    .addTag('mutation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start listening
  const configService = app.get(ApiConfigService);
  const port = configService.getPort();
  await app.listen(port);

  const logger = new Logger('main');
  logger.log(`Started on port:${port}`);
}

bootstrap();
