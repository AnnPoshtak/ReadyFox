import { api } from '../axiosInstance';
import {
  type Quiz,
  type CreateQuizDto,
  type UpdateQuizDto,
  type DeleteQuizResponse,
} from '../types';

export const quizzesApi = {
  create: async (dto: CreateQuizDto): Promise<Quiz> => {
    const response = await api.post<Quiz>('/quizzes', dto);
    return response.data;
  },

  findAll: async (): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>('/quizzes');
    return response.data;
  },

  findMyQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>('/quizzes/my');
    return response.data;
  },

  findOne: async (id: number): Promise<Quiz> => {
    const response = await api.get<Quiz>(`/quizzes/${id}`);
    return response.data;
  },

  update: async (id: number, dto: UpdateQuizDto): Promise<Quiz> => {
    const response = await api.patch<Quiz>(`/quizzes/${id}`, dto);
    return response.data;
  },

  remove: async (id: number): Promise<DeleteQuizResponse> => {
    const response = await api.delete<DeleteQuizResponse>(`/quizzes/${id}`);
    return response.data;
  },
};