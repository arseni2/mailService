import { Module } from '@nestjs/common';
import { SmtpService } from "../../common/services/smtp.service";
import { OrdersController } from "./controllers/orders.controller";
import { OrdersService } from "./services/orders.service";

@Module({
  providers: [OrdersService, SmtpService],
  controllers: [OrdersController]
})
export class OrdersModule {}
