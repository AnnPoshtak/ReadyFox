import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionOptionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @ApiProperty({ example: 'Париж' })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isCorrect!: boolean;
}

export class QuestionDto {
  @ApiProperty({ example: 'Столиця Франції?' })
  @IsString()
  @IsNotEmpty()
  questionText!: string;

  @ApiProperty({ type: [QuestionOptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto) 
  options!: QuestionOptionDto[];
}

export class CreateQuizDto {
  @ApiProperty({ example: 'Географія світу' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Географія' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  timeToRead!: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  timeToPass!: number;

  @ApiProperty({ type: [QuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto) 
  questions!: QuestionDto[];
}