import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async create(userId: number, createQuizeDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create({
      ...createQuizeDto,
      author: { id: userId },
    });

    return this.quizRepository.save(quiz);
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

  async update(
    id: number,
    userId: number,
    updateQuizeDto: UpdateQuizDto,
  ): Promise<Quiz> {
    const quiz = await this.findOne(id);

    if (quiz.author.id !== userId) {
      throw new ForbiddenException('You are not the owner of this quiz');
    }

    const updatedQuiz = this.quizRepository.merge(quiz, updateQuizeDto);

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