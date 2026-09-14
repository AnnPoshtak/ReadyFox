import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRealtimeGateway } from './quiz-realtime.gateway';
import { QuizRealtimeService } from './quiz-realtime.service';
import { Quiz } from '@/quizzes/entities/quiz.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz]), 
  ],
  providers: [QuizRealtimeGateway, QuizRealtimeService],
})
export class QuizRealtimeModule {}