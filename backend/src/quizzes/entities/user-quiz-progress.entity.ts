import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Quiz } from './quiz.entity';

@Entity('user_quiz_progress')
export class UserQuizProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.quizProgress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'quiz_id' })
  quizId: number;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column({ type: 'smallint', name: 'grade_12' })
  grade12: number;

  @Column({ type: 'float', default: 0 })
  score: number;

  @Column({ name: 'raw_score', type: 'smallint' })
  rawScore: number;

  @Column({ name: 'max_score', type: 'smallint' })
  maxScore: number;


  @CreateDateColumn({ name: 'completed_at' })
  completedAt: Date;
}