import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export interface ErrorResponse {
  errors: {
    [key: string]: string[];
  };
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: ValidationError[]) {
    super();
  }
}

export class AppException extends BadRequestException {
  constructor(field: string, messages: string[]) {
    super({
      errors: {
        [field]: messages
      }
    });
  }
}

// Хелпер для создания ошибок
export const createError = (field: string, message: string | string[]): ErrorResponse => ({
  errors: {
    [field]: Array.isArray(message) ? message : [message]
  }
}); 