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

export interface OnboardingDto {
  fullName?: string;
  age?: number;
  interests?: string[];
}

export interface OnboardingResponse {
  message: string;
  user: UserProfile;
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

export interface CreateQuizeDto {
  name: string;
  category: string;
  questions: QuestionDto[];
}

export type UpdateQuizeDto = Partial<CreateQuizeDto>;

export interface Quiz {
  id: number;
  name: string;
  category: string;
  createdAt: string;
  editedAt: string;
  author?: QuizAuthor;
  questions?: Question[];
}

export interface DeleteQuizResponse {
  message: string;
}