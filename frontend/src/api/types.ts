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