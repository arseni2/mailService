import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductImage {
  @IsNumber()
  @IsOptional()
  id: number | null;
  
  @IsNumber()
  @IsOptional()
  product_id: number | null;
  
  @IsNumber()
  @IsOptional()
  position: number | null;
  
  @IsString()
  @IsOptional()
  src: string | null;
}