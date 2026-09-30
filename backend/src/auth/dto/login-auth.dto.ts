import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'Некоректний email' })
  @IsNotEmpty({ message: 'Email обов\'язковий' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль обов\'язковий' })
  @MinLength(8, { message: 'Мінімум 8 символів' })
  password: string;
}