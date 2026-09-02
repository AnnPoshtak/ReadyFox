export interface CreateAuthDto {
  email: string;
  password: string;
  nameAndSurname?: string;
}

export interface RegisterResponse {
  message: string;
  id: number;
  email: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  id: number;
  email: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: number;
  email: string;
  nameAndSurname?: string;
}

export interface LogoutResponse {
  message: string;
}

// Quizzes
export interface QuestionOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface QuestionDto {
  questionText: string;
  options: QuestionOption[];
}

export interface Question extends QuestionDto {
  id: number;
}

export interface QuizAuthor {
  id: number;
  nameAndSurname?: string;
  email?: string;
}

export interface CreateQuizDto {
  title: string;
  category: string;
  timeToRead: number;
  timeToPass: number;
  questions: QuestionDto[];
}

export type UpdateQuizDto = Partial<CreateQuizDto>;
  
export interface Quiz {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  editedAt: string;
  author?: QuizAuthor;
  questions?: Question[];
}

export interface DeleteQuizResponse {
  message: string;
}


// Lessons
export interface Lesson {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  editedAt: string;
  author?: QuizAuthor;
}

export interface CreateLessonDto {
  title: string;
  content: string;
}

export type UpdateLessonDto = Partial<CreateLessonDto>;

export interface DeleteLessonResponse {
  message: string;
}
export interface LessonAuthor {
  id: number;
  nameAndSurname?: string;
  email?: string;
}

