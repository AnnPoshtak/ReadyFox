import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
  IsOptional,
  IsUrl,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MainMediaType } from '../entities/lesson.entity';

export class AdditionalResourceDto {
  @ApiProperty({ example: 'Енциклопедія історії України' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'https://uk.wikipedia.org/wiki/Історія_України' })
  @IsUrl()
  @IsNotEmpty()
  url!: string;
}

export class CreateLessonDto {
  @ApiProperty({ example: 'Історія України XX століття' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Історія' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: 'Розібратися в ключових подіях та хронології початку століття' })
  @IsString()
  @IsNotEmpty()
  goal!: string;

  @ApiProperty({ example: '# Українська революція\nУ цьому уроці ми розглянемо основні дати...' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ enum: MainMediaType, example: MainMediaType.PRESENTATION })
  @IsEnum(MainMediaType)
  @IsOptional()
  mainMediaType?: MainMediaType;

  @ApiPropertyOptional({ example: 'https://docs.google.com/presentation/d/112233/embed' })
  @IsUrl()
  @IsOptional()
  mainMediaUrl?: string;

  @ApiPropertyOptional({ type: [AdditionalResourceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalResourceDto)
  @IsOptional()
  additionalResources?: AdditionalResourceDto[];

  @ApiPropertyOptional({ example: 5, description: 'ID квізу для закріплення' })
  @IsNumber()
  @IsOptional()
  quizId?: number;
}