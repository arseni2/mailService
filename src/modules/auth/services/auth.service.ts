import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SmtpService } from "../../../common/services/smtp.service";
import { CreateOtpCodeDto } from "../dto/create-otp-code.dto";
import CreateOtpCodeTemplate from '../templates/create-otp-code.template';

@Injectable()
export class AuthService {
  constructor(private smtpService: SmtpService) { }

  async createOtpCode(dto: CreateOtpCodeDto) {
    try {
      // * Данные для письма
      const template = CreateOtpCodeTemplate;
      const subject = `${dto.code} - Код авторизации`;

      // * Отправка письма
      await this.smtpService.send(
        template,
        subject,
        dto
      );
    } catch (error) {
      throw new InternalServerErrorException('Возникла внутренняя ошибка сервера');
    }
  }
}

