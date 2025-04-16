import { IsOptional, IsString } from 'class-validator';

export class ProductSeo {
  @IsString()
  title: string;
  
  @IsString()
  @IsOptional()
  description: string | null;
  
  @IsString()
  @IsOptional()
  keywords: string | null;
}