import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRoomDto {
  @IsNumber({}, { message: 'quizId має бути числом' })
  @IsPositive({ message: 'quizId має бути додатним числом' })
  @IsNotEmpty({ message: 'quizId є обов’язковим полем' })
  quizId: number;
}