import { api } from '../axiosInstance';
import {
  type Quiz,
  type CreateQuizeDto,
  type UpdateQuizeDto,
  type DeleteQuizResponse,
} from '../types';

export const quizzesApi = {
  create: async (dto: CreateQuizeDto): Promise<Quiz> => {
    const response = await api.post<Quiz>('/quizes', dto);
    return response.data;
  },

  findAll: async (): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>('/quizes');
    return response.data;
  },

  findMyQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>('/quizes/my');
    return response.data;
  },

  findOne: async (id: number): Promise<Quiz> => {
    const response = await api.get<Quiz>(`/quizes/${id}`);
    return response.data;
  },

  update: async (id: number, dto: UpdateQuizeDto): Promise<Quiz> => {
    const response = await api.patch<Quiz>(`/quizes/${id}`, dto);
    return response.data;
  },

  remove: async (id: number): Promise<DeleteQuizResponse> => {
    const response = await api.delete<DeleteQuizResponse>(`/quizes/${id}`);
    return response.data;
  },
};