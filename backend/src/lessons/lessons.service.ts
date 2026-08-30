import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create(userId: number, createLessonDto: CreateLessonDto): Promise<Lesson> {
    const { quizId, ...lessonData } = createLessonDto;

    const lesson = this.lessonRepository.create({
      ...lessonData,
      author: { id: userId },
      quiz: quizId ? ({ id: quizId } as any) : null,
    });

    return this.lessonRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find({
      relations: {
        author: true,
        quiz: true,
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

  async findByUser(userId: number): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: { author: { id: userId } },
      relations: {
        quiz: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: {
        author: true,
        quiz: true,
      },
      select: {
        author: {
          id: true,
          nameAndSurname: true,
          email: true,
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async update(
    id: number,
    userId: number,
    updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson> {
    const lesson = await this.findOne(id);

    if (lesson.author.id !== userId) {
      throw new ForbiddenException('You are not the owner of this lesson');
    }

    const { quizId, ...lessonData } = updateLessonDto;

    const updatedLesson = this.lessonRepository.merge(lesson, {
      ...lessonData,
      quiz: quizId !== undefined ? (quizId ? ({ id: quizId } as any) : null) : lesson.quiz,
    });

    return this.lessonRepository.save(updatedLesson);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const lesson = await this.findOne(id);

    if (lesson.author.id !== userId) {
      throw new ForbiddenException('You are not the owner of this lesson');
    }

    await this.lessonRepository.remove(lesson);
    return { message: `Lesson with ID ${id} successfully deleted` };
  }
}