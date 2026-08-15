import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Question } from './question.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ name: 'time_to_read' })
  timeToRead: number;

  @Column({ name: 'time_to_pass' })
  timeToPass: number;

  @ManyToOne(() => User, (user) => user.quizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'edited_at' })
  editedAt: Date;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[];
}