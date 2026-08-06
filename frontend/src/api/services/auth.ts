import { api } from '../axiosInstance';
import {
  type CreateAuthDto,
  type RegisterResponse,
  type AuthResult,
  type UserProfile,
  type LogoutResponse,
  type OnboardingDto,
  type OnboardingResponse,
} from '../types';

export const authApi = {
  register: async (dto: CreateAuthDto): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', dto);
    return response.data;
  },

  login: async (dto: CreateAuthDto): Promise<AuthResult> => {
    const response = await api.post<AuthResult>('/auth/login', dto);
    
    if (response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/auth/profile');
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await api.post<LogoutResponse>('/auth/logout');
      return response.data;
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  googleLogin: (): void => {
    const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    window.location.href = `${baseURL}/auth/google`;
  },

  completeOnboarding: async (dto: OnboardingDto): Promise<OnboardingResponse> => {
    const response = await api.patch<OnboardingResponse>('/auth/onboarding', dto);
    return response.data;
  },
};