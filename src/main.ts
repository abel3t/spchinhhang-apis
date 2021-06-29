import 'reflect-metadata';

import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import { fastifyHelmet } from 'fastify-helmet';
import fmp from 'fastify-multipart';

import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filters/error.filter';
import { QueryFailedFilter } from './filters/query-failed.filter';

export async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(fastifyCookie);
  await app.register(fmp);
  await app.register(fastifyCsrf, { cookieKey: 'X-CSRF-Token' });
  await app.register(fastifyHelmet);

  app.use(compression());

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new QueryFailedFilter(reflector),
    new ErrorExceptionFilter()
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors)
    })
  );

  const config = new DocumentBuilder()
    .setTitle('spchinhhang APIs')
    .setDescription('spchinhhang APIs')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = 3000;
  await app.listen(
    process.env.PORT || port,
    '0.0.0.0',
    (err: Error, address: string) => {
      if (!err) {
        Logger.log(`\n\n\nServer started at ${address}\n\n`);

        return;
      }

      Logger.log(err);
    }
  );

  console.info(`server running on port ${process.env.PORT || port}`);

  return app;
}

void bootstrap();
