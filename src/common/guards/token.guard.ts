import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  private readonly expectedToken: string = process.env.MAIL_TOKEN || "";

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];

    // Если токен не установлен в переменных окружения, пропускаем проверку
    if (!this.expectedToken) {
      return true;
    }

    if (token !== this.expectedToken) {
      throw new ForbiddenException('Недостаточно прав для доступа');
    }

    return true;
  }
} 