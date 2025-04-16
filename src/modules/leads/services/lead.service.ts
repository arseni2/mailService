import { Injectable } from '@nestjs/common';
import { SmtpService } from "../../../common/services/smtp.service";
import { CreateLeadDto } from "../dto/create-lead.dto";
import CreateFeedbackTemplate from '../templates/create-feedback.template';
import CreateLeadTemplate from '../templates/create-lead.template';

@Injectable()
export class LeadService {
  constructor(private readonly smtpService: SmtpService) { }

  /**
   * Уведомление для продавца о создании лида
   * @param dto 
   */
  async createLead(dto: CreateLeadDto) {
    // * Данные для письма
    const template = CreateLeadTemplate;
    const subject = `Лид #${dto.id} успешно создан`;

    // * Отправка письма
    try {
      await this.smtpService.send(
        template,
        subject,
        dto
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  /**
   * Уведомление для клиента о создании лида
   * @param dto 
   */
  async createFeedback(dto: CreateLeadDto) {
    // * Данные для письма
    const template = CreateFeedbackTemplate;
    const subject = `Запрос #${dto.id} успешно создан`;

    // * Отправка письма
    try {
      await this.smtpService.send(
        template,
        subject,
        dto
      );
    } catch (error) {
      console.error(error);
    }
  }
}
