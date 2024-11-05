import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppException } from './app.exception';
import { MESSAGE } from 'src/global-constant';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    if (exception instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        // code: ErrorCode.E999404,
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.message,
        error: exception.name,
      });
    }

    if (exception instanceof BadRequestException) {
      console.log(exception.message);

      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: exception.name,
      });
    }

    if (exception instanceof UnprocessableEntityException) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json(exception.getResponse());
    }

    if (exception instanceof UnauthorizedException) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        // code: ErrorCode.E999401,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: exception.message,
        error: exception.name,
      });
    }

    if (exception instanceof AppException) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: exception.getResponse(),
        message: 'BAD_REQUEST',
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        '********************** [Start: Backend Logs] ********************** ',
      );
      console.log('Handle allException=', exception);
      console.log(
        '********************** [Summary of errors: logs] ********************** ',
      );
      console.log('ERROR LOG ', new Date().toLocaleString());
      console.log('Request:', req.method, req.originalUrl);
      console.log('Params:', req.params);
      console.log('Body:', req.body);
      console.log('Query:', req.query);
      console.log('Message: ', exception.message);
      console.log('Error: ', exception.name);
      console.log(
        '********************** [End: Backend Logs] ********************** ',
      );
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      // code: ErrorCode.E999999,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message ?? MESSAGE.SYSTEM.SERVER_ERROR,
      error: exception.name,
    });
  }
}
