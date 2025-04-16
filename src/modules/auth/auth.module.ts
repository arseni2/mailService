import { Module } from '@nestjs/common';
import { SmtpService } from "../../common/services/smtp.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, SmtpService],
  imports: []
})
export class AuthModule {}
