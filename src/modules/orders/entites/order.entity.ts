import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../enums/order.enum';
import { OrderProduct } from './order-product.entity';

export class Order {
  @IsNumber()
  id: number;
  
  @IsNumber()
  buyer_id: number;
  
  @IsNumber()
  seller_id: number;
  
  @IsEnum(OrderStatus)
  status: OrderStatus;
  
  @Transform(({ value }) => typeof value === 'string' ? Number(value) : value)
  @IsNumber()
  total: number;
  
  @IsString()
  @IsOptional()
  phone: string | null;
  
  @IsString()
  @IsOptional()
  email: string | null;
  
  @IsString()
  @IsOptional()
  comment: string | null;
  
  @IsString()
  @IsOptional()
  created_at?: string;
  
  @IsString()
  @IsOptional()
  updated_at?: string;
  
  @IsArray()
  @IsOptional()
  @Type(() => OrderProduct)
  products: OrderProduct[];
}
