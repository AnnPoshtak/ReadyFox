import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { CompleteQuizDto } from './dto/complete-quiz.dto';
import { UserQuizProgress } from './entities/user-quiz-progress.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(UserQuizProgress)
    private readonly userQuizProgressRepository: Repository<UserQuizProgress>
  ) { }

  async create(userId: number, createQuizeDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create({
      ...createQuizeDto,
      author: { id: userId },
    });

    return this.quizRepository.save(quiz);
  }

  async submitQuiz(userId: number, payload: CompleteQuizDto): Promise<any> {
    const quiz = await this.findOne(payload.quizId);
    const totalQuestions = quiz.questions.length;

    if (totalQuestions === 0) {
      return { score: 0, grade12: 0, correctAnswers: 0, totalQuestions: 0 };
    }

    let correctAnswers = 0;

    for (const answer of payload.answers) {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      const correctOption = question?.options.find((opt) => opt.isCorrect);

      if (correctOption && correctOption.id === answer.selectedOptionId) {
        correctAnswers += 1;
      }
    }

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const grade12 = Math.round((correctAnswers / totalQuestions) * 12);

    const userQuizProgress = this.userQuizProgressRepository.create({
      userId,
      quizId: payload.quizId,
      score,
      grade12,
      rawScore: correctAnswers,
      maxScore: totalQuestions,
    });

    await this.userQuizProgressRepository.save(userQuizProgress);

    return {
      score,
      grade12,
      correctAnswers,
      totalQuestions,
    };
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({
      relations: {
        author: true,
        questions: true,
      },
      select: {
        author: {
          id: true,
          nameAndSurname: true,
          email: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: number): Promise<Quiz[]> {
    return this.quizRepository.find({
      where: { author: { id: userId } },
      relations: {
        questions: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: {
        author: true,
        questions: true,
      },
      select: {
        author: {
          id: true,
          nameAndSurname: true,
          email: true,
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async findOneWithoutAnswers(id: number): Promise<any> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: {
        author: true,
        questions: true,
      },
      select: {
        author: {
          id: true,
          nameAndSurname: true,
          email: true,
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return {
      ...quiz,
      questions: quiz.questions?.map(question => ({
        ...question,
        options: question.options?.map(({ isCorrect, ...cleanOption }) => cleanOption) ?? []
      })) ?? []
    };
  }


  async update(
    id: number,
    userId: number,
    updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    const quiz = await this.findOne(id);

    if (quiz.author.id !== userId) {
      throw new ForbiddenException('You are not the owner of this quiz');
    }
    if (updateQuizDto.questions) {
      await this.questionRepository.delete({ quiz: { id } });
      quiz.questions = [];
    }
    const updatedQuiz = this.quizRepository.merge(quiz, updateQuizDto);

    return this.quizRepository.save(updatedQuiz);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const quiz = await this.findOne(id);

    if (quiz.author.id !== userId) {
      throw new ForbiddenException('You are not the owner of this quiz');
    }

    await this.quizRepository.remove(quiz);
    return { message: `Quiz with ID ${id} successfully deleted` };
  }
}