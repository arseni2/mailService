import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationException } from './common/exceptions/validation.exception';
import { ValidationFilter } from './common/filters/validation.filter';

async function bootstrap() {
  // * Создаем приложение
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // * Добавляем глобальный префикс для API
  app.setGlobalPrefix('mail');

  // * Настраиваем CORS
  app.enableCors({
    origin: true, // Разрешаем любой origin
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With', 'X-Forwarded-For', 'X-Real-IP'],
    exposedHeaders: [],
    credentials: true,
    maxAge: 86400
  });

  // * Настраиваем заголовки безопасности через helmet
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'https:'],
        scriptSrc: [`'self'`],
      },
    },
    xssFilter: true,
    hidePoweredBy: true,
    frameguard: {
      action: 'deny'
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true
    },
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin'
    }
  });

  // * Настраиваем глобальную валидацию
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Автоматическое преобразование типов
    whitelist: true, // Удаление лишних полей
    forbidNonWhitelisted: false, // Разрешаем неизвестные параметры
    exceptionFactory: (errors) => new ValidationException(errors),
  }));

  // * Добавляем фильтр для обработки ошибок валидации
  app.useGlobalFilters(new ValidationFilter());

  // * Запускаем сервер
  await app.listen(process.env.MAIL_PORT!, '0.0.0.0');
}

bootstrap();