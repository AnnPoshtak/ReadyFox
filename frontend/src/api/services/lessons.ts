import { api } from '../axiosInstance';
import {
  type Lesson,
  type CreateLessonDto,
  type UpdateLessonDto,
  type DeleteLessonResponse,
} from '../types';

export const lessonsApi = {
  create: async (dto: CreateLessonDto): Promise<Lesson> => {
    const response = await api.post<Lesson>('/lessons', dto);
    return response.data;
  },

  findAll: async (): Promise<Lesson[]> => {
    const response = await api.get<Lesson[]>('/lessons');
    return response.data;
  },

  findMyLessons: async (): Promise<Lesson[]> => {
    const response = await api.get<Lesson[]>('/lessons/my');
    return response.data;
  },

  findOne: async (id: number): Promise<Lesson> => {
    const response = await api.get<Lesson>(`/lessons/${id}`);
    return response.data;
  },

  update: async (id: number, dto: UpdateLessonDto): Promise<Lesson> => {
    const response = await api.patch<Lesson>(`/lessons/${id}`, dto);
    return response.data;
  },

  remove: async (id: number): Promise<DeleteLessonResponse> => {
    const response = await api.delete<DeleteLessonResponse>(`/lessons/${id}`);
    return response.data;
  },
};