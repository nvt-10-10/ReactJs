import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { ValidationError } from 'class-validator';
import { MESSAGE } from './global-constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        try {
          const data: any = {};
          for (const err of errors) {
            data[err.property] = err.constraints
              ? Object.values(err.constraints)
              : undefined;
            if (err.children.length) {
              for (const childrenError of err.children) {
                data[childrenError.property] = Object.values(
                  childrenError.constraints,
                );
              }
            }
          }
          return new UnprocessableEntityException({
            // code: ErrorCode.E999422,
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: MESSAGE.SYSTEM.VALIDATE_ERROR,
            errors: data,
          });
        } catch (e) {
          return new UnprocessableEntityException({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: MESSAGE.SYSTEM.VALIDATE_ERROR,
            errors: errors,
          });
        }
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:9999',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
