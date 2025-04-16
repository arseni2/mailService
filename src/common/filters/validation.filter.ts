import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { FastifyReply } from 'fastify';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const errors = this.formatErrors(exception.validationErrors);

    return response
      .status(422)
      .send({
        errors
      });
  }

  private formatErrors(errors: ValidationError[]) {
    const formattedErrors = {};

    errors.forEach(error => {
      const constraints = error.constraints;
      if (constraints) {
        formattedErrors[error.property] = Object.values(constraints);
      }

      // Обработка вложенных ошибок
      if (error.children?.length) {
        const childErrors = this.formatErrors(error.children);
        Object.assign(formattedErrors, childErrors);
      }
    });

    return formattedErrors;
  }
} 