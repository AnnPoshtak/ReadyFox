import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Quiz } from 'src/quizzes/entities/quiz.entity'; 
import { UserLessonProgress } from '@/lessons/entities/user-lesson-progress.entity';
import { UserQuizProgress } from '@/quizzes/entities/user-quiz-progress.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'name_and_surname', nullable: true })
  nameAndSurname?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'varchar', nullable: true })
  hashedRefreshToken?: string | null;

  @OneToMany(() => Quiz, (quiz) => quiz.author)
  quizzes: Quiz[];

  @OneToMany(() => UserLessonProgress, (progress) => progress.user)
  lessonProgress: UserLessonProgress[];

  @OneToMany(() => UserQuizProgress, (progress) => progress.user)
  quizProgress: UserQuizProgress[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}