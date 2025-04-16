import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from "../services/orders.service";

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('orders')
  @HttpCode(HttpStatus.NO_CONTENT)
  async createOrder(@Body() dto: CreateOrderDto, @Req() request: Request) {
    return this.ordersService.createOrder(dto);
  }
  
  @Post('sales')
  @HttpCode(HttpStatus.NO_CONTENT)
  async createSale(@Body() dto: CreateOrderDto) {
    return this.ordersService.createSale(dto);
  }
}
