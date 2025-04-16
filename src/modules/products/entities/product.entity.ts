import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '../enums/product.enum';
import { ProductImage } from './product-image.entity';
import { ProductSeo } from './product-seo.entity';

export class Product {
  @IsNumber()
  id: number;
  
  @IsNumber()
  @IsOptional()
  seller_id?: number;
  
  @IsNumber()
  @IsOptional()
  position: number;
  
  @IsString()
  @IsOptional()
  slug: string | null;
  
  @IsString()
  @IsOptional()
  code: string | null;
  
  @IsString()
  @IsOptional()
  title: string | null;
  
  @IsString()
  @IsOptional()
  description: string | null;
  
  @Transform(({ value }) => typeof value === 'string' ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  price: number | null;
  
  @Transform(({ value }) => typeof value === 'string' ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  price_old: number | null;
  
  @IsString()
  @IsOptional()
  prefix: string | null;
  
  @IsString()
  @IsOptional()
  postfix: string | null;
  
  @IsNumber()
  @IsOptional()
  quantity: number | null;
  
  @IsEnum(ProductStatus)
  @IsOptional()
  status: ProductStatus | null;

  @IsArray()
  @IsOptional()
  @Type(() => ProductImage)
  images?: ProductImage[];
  
  @IsOptional()
  @Type(() => ProductSeo)
  seo?: ProductSeo;
}
