import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserAnswerDto {
  @ApiProperty({ example: 12, description: 'ID запитання' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  questionId!: number;

  @ApiProperty({ example: 45, description: 'ID обраного варіанта відповіді' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  selectedOptionId!: number; 
}

export class CompleteQuizDto {
  @ApiProperty({ example: 101, description: 'ID квізу, який проходить учень' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quizId!: number;

  @ApiProperty({ type: [UserAnswerDto], description: 'Масив відповідей учня' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserAnswerDto)
  answers!: UserAnswerDto[];

}