import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ToDto } from 'src/common/dto/to.dto';
import { LeadStatus } from 'src/modules/leads/enum/lead.enum';

export class CreateLeadDto extends ToDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1, {
        message: 'ID лида должен быть целым числом больше 0'
    })
    id: number;

    @IsEnum(LeadStatus)
    status?: LeadStatus;

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
}