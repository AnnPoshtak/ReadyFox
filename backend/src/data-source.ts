import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(process.cwd(), '../.env') });

// Перевіряємо, чи запустився код із папку dist (продакшн збірка)
const isDist = __dirname.includes('dist');

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD ?? ''),
  database: process.env.DB_NAME,
  // Якщо файл у dist — використовуємо .js, якщо у src — використовуємо .ts
  entities: [isDist ? path.join(__dirname, '/**/*.entity.js') : 'src/**/*.entity.ts'],
  migrations: [isDist ? path.join(__dirname, '/migrations/*.js') : 'src/migrations/*.ts'],
  synchronize: false,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

export const AppDataSource = new DataSource(dataSourceOptions);