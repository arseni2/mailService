import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/modules/products/entities/product.entity';

export class OrderProduct {
  @IsNumber()
  order_id: number;
  
  @IsNumber()
  product_id: number;
  
  @IsString()
  @IsOptional()
  code: string;
  
  @IsString()
  title: string;  
  
  @Transform(({ value }) => typeof value === 'string' ? Number(value) : value)
  @IsNumber()
  price: number;
  
  @Transform(({ value }) => typeof value === 'string' ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  price_old: number;
  
  @IsString()
  @IsOptional()
  prefix: string | null;
  
  @IsString()
  @IsOptional()
  postfix: string | null;
  
  @IsNumber()
  quantity: number;
  
  @IsOptional()
  @Type(() => Product)
  product: Product;
}
