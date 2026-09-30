import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserLessonProgress } from '@/lessons/entities/user-lesson-progress.entity';
import { UserQuizProgress } from '@/quizzes/entities/user-quiz-progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserLessonProgress, UserQuizProgress]), 
  ],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}