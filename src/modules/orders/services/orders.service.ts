import { Injectable } from '@nestjs/common';
import { SmtpService } from "../../../common/services/smtp.service";
import { CreateOrderDto } from '../dto/create-order.dto';
import CreateOrderTemplate from '../templates/create-order.template';
import CreateSaleTemplate from '../templates/create-sale.template';

@Injectable()
export class OrdersService {
    constructor(private readonly smtpService: SmtpService) { }

    /**
     * Уведомление для клиента о создании заказа
     * @param dto 
     */
    async createOrder(dto: CreateOrderDto) {
        // * Данные для письма
        const template = CreateOrderTemplate;
        const subject = `Заказ #${dto.id} успешно создан`;

        // * Отправка письма
        await this.smtpService.send(
            template,
            subject,
            dto
        );
    }

    /**
     * Уведомление для продавца о создании продажи
     * @param dto 
     */
    async createSale(dto: CreateOrderDto) {
        // * Данные для письма
        const template = CreateSaleTemplate;
        const subject = `Заказ #${dto.id} успешно создан`;

        // * Отправка письма
        await this.smtpService.send(
            template,
            subject,
            dto
        );
    }
}
