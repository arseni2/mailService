import { Module } from '@nestjs/common';
import { SmtpService } from "../../common/services/smtp.service";
import { LeadController } from "./contollers/lead.controller";
import { LeadService } from "./services/lead.service";

@Module({
  controllers: [LeadController],
  providers: [LeadService, SmtpService],
  imports: []
})
export class LeadModule {}