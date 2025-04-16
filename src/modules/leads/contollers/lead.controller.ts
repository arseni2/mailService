import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateLeadDto } from "../dto/create-lead.dto";
import { LeadService } from "../services/lead.service";

@Controller()
export class LeadController {
  constructor(private readonly leadService: LeadService) { }

  @Post('leads')
  @HttpCode(HttpStatus.NO_CONTENT)
  async createLead(@Body() dto: CreateLeadDto) {
    return this.leadService.createLead(dto);
  }
  
  @Post('feedbacks')
  @HttpCode(HttpStatus.NO_CONTENT)
  async createFeedback(@Body() dto: CreateLeadDto) {
    return this.leadService.createFeedback(dto);
  }
}
