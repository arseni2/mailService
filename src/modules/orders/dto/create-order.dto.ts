import { Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { ToDto } from 'src/common/dto/to.dto';
import { OrderProduct } from '../entites/order-product.entity';
import { OrderStatus } from '../enums/order.enum';

export class CreateOrderDto extends ToDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1, {
        message: 'ID заказа должен быть целым числом больше 0'
    })
    id: number;

    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsNotEmpty()
    @Transform(({ value }) => typeof value === 'string' ? Number(value) : value)
    @IsNumber({}, {
        message: 'Сумма заказа должна быть числом большем 0'
    })
    total: number;

    @IsEmail({}, {
        message: 'Некорректный email'
    })
    @MaxLength(64, {
        message: 'Email не может быть длиннее 64 символов'
    })
    email?: string;

    @IsString()
    @MaxLength(16, {
        message: 'Телефон не может быть длиннее 16 символов'
    })
    phone?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1024, {
        message: 'Комментарий не может быть длиннее 1024 символов'
    })
    comment?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProduct)
    products?: OrderProduct[];
}