import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';
import { databaseConfig } from './config/app.config';

config();

const isDist = __dirname.includes('dist');
const dbConf = databaseConfig();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbConf.host,
  port: dbConf.port,
  username: dbConf.username,
  password: dbConf.password,
  database: dbConf.database,
  ssl: dbConf.ssl,
  entities: [isDist ? path.join(__dirname, '/**/*.entity.js') : 'src/**/*.entity.ts'],
  migrations: [isDist ? path.join(__dirname, '/migrations/*.js') : 'src/migrations/*.ts'],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);