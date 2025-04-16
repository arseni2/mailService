import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateOtpCodeDto } from "../dto/create-otp-code.dto";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createOtpCode(@Body() dto: CreateOtpCodeDto) {
    return this.authService.createOtpCode(dto);
  }
}
