import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

export class entityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(404).json({
      message: {
        satusCode: 404,
        error: 'Not Found',
        message: exception.message,
      },
    });
  }
}
