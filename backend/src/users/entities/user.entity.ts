import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Quiz } from 'src/quizzes/entities/quiz.entity'; 

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}