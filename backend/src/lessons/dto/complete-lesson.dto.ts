import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CompleteLessonDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  lessonId!: number;
}