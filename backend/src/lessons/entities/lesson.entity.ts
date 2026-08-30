import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Quiz } from '@/quizzes/entities/quiz.entity';

export enum MainMediaType {
  PRESENTATION = 'PRESENTATION',
  VIDEO = 'VIDEO',
  NONE = 'NONE',
}

export interface AdditionalResource {
  title: string;
  url: string;
}

@Entity('lesson')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column({ type: 'text' })
  goal: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    name: 'main_media_type',
    type: 'enum',
    enum: MainMediaType,
    default: MainMediaType.NONE,
  })
  mainMediaType: MainMediaType;

  @Column({ name: 'main_media_url', nullable: true })
  mainMediaUrl: string;

  @Column({ name: 'additional_resources', type: 'json', nullable: true })
  additionalResources: AdditionalResource[];

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Quiz, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'edited_at' })
  editedAt: Date;
}