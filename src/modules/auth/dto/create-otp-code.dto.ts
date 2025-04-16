import { IsEmail, IsNumber, Max, MaxLength, Min } from 'class-validator';
import { ToDto } from 'src/common/dto/to.dto';

export class CreateOtpCodeDto extends ToDto {
    @IsNumber({}, {
        message: 'Код должен быть числом'
    })
    @Min(100000, {
        message: 'Код должен состоять из 6 цифр'
    })
    @Max(999999, {
        message: 'Код должен состоять из 6 цифр'
    })
    code: number;
} 