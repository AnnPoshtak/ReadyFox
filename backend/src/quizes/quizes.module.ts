import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizesService } from './quizes.service';
import { QuizesController } from './quizes.controller';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  controllers: [QuizesController],
  providers: [QuizesService],
  exports: [QuizesService],
})
export class QuizesModule {}