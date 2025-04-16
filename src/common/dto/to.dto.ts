import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ToDto {
    @IsNotEmpty({
        message: 'Е-mail получателя не может быть пустым'
    })
    @IsEmail({}, {
        message: 'Указан некорректный email'
    })
    @MaxLength(64, {
        message: 'E-mail не может быть длиннее 64 символов'
    })
    to: string;
}