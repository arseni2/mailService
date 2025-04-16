import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from '@nestjs/core';
import { TokenGuard } from "./common/guards/token.guard";
import { SmtpService } from "./common/services/smtp.service";
import { AuthModule } from "./modules/auth/auth.module";
import { LeadModule } from "./modules/leads/lead.module";
import { OrdersModule } from "./modules/orders/orders.module";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, LeadModule, OrdersModule],
  controllers: [],
  providers: [
    SmtpService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}