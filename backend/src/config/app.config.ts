import { registerAs } from '@nestjs/config';

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const appConfig = registerAs('app', () => ({
  port: Number(process.env.PORT) || 3000, 
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
}));

export const authConfig = registerAs('auth', () => ({
  jwtSecret: required('JWT_SECRET'),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET'),
  google: {
    clientId: required('GOOGLE_CLIENT_ID'),
    clientSecret: required('GOOGLE_CLIENT_SECRET'),
    callbackUrl: required('GOOGLE_CALLBACK_URL'),
  },
}));

export const databaseConfig = registerAs('db', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: required('DB_USERNAME'),
  password: required('DB_PASSWORD'),
  database: required('DB_NAME'),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
}));