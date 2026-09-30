import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserLessonProgress } from '@/lessons/entities/user-lesson-progress.entity';
import { UserQuizProgress } from '@/quizzes/entities/user-quiz-progress.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(UserLessonProgress)
    private readonly lessonProgressRepo: Repository<UserLessonProgress>,
    @InjectRepository(UserQuizProgress)
    private readonly quizProgressRepo: Repository<UserQuizProgress>,
  ) { }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async findUserWithQuizzes(id: number): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { id },
      relations: { quizzes: true },
    });
  }

  async createUser(
    email: string,
    pass: string,
    nameAndSurname?: string,
  ): Promise<User> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(
        'Користувач з таким email вже існує',
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = this.usersRepo.create({
      email,
      password: hashedPassword,
      nameAndSurname,
    });

    return this.usersRepo.save(newUser);
  }

  async findOrCreateGoogleUser(
    email: string,
    nameAndSurname?: string,
  ): Promise<User> {
    let user = await this.findUserByEmail(email);

    if (!user) {
      user = this.usersRepo.create({
        email,
        nameAndSurname,
      });
      user = await this.usersRepo.save(user);
    } else if (!user.nameAndSurname && nameAndSurname) {
      user.nameAndSurname = nameAndSurname;
      user = await this.usersRepo.save(user);
    }

    return user;
  }

  async setCurrentRefreshToken(userId: number, hashedRefreshToken: string) {
    await this.usersRepo.update(userId, { hashedRefreshToken });
  }

  async removeRefreshToken(userId: number) {
    await this.usersRepo.update(userId, { hashedRefreshToken: null });
  }

  async getUserFullHistory(userId: number) {
    const lessonsProgress = await this.lessonProgressRepo.find({
      where: { user: { id: userId } },
      relations: {
        lesson: true,
      },
      select: {
        id: true,
        lessonId: true,
        isCompleted: true,
        completedAt: true,
        lesson: {
          id: true,
          title: true,
          category: true, 
        },
      },
      order: { completedAt: 'DESC' },
    });

    const quizzesProgress = await this.quizProgressRepo.find({
      where: { userId },
      relations: {
        quiz: true,
      },
      select: {
        id: true,
        quizId: true,
        score: true,
        grade12: true,
        rawScore: true,
        maxScore: true,
        completedAt: true,
        quiz: {
          id: true,
          title: true,
          category: true,
        },
      },
      order: { completedAt: 'DESC' },
    });

    return {
      lessons: lessonsProgress.map((item) => ({
        id: item.id,
        lessonId: item.lessonId,
        title: item.lesson?.title,
        subject: item.lesson?.category,
        isCompleted: item.isCompleted,
        completedAt: item.completedAt,
      })),
      quizzes: quizzesProgress.map((item) => ({
        id: item.id,
        quizId: item.quizId,
        title: item.quiz?.title,
        subject: item.quiz?.category,
        score: item.score,
        grade12: item.grade12,
        rawScore: item.rawScore,
        maxScore: item.maxScore,
        completedAt: item.completedAt,
      })),
    };
  }
}