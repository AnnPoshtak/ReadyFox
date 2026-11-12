import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';
import { databaseConfig } from './config/app.config';

config({ path: path.resolve(process.cwd(), '../.env') });
const dbConf = databaseConfig();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbConf.host,
  port: dbConf.port,
  username: dbConf.username,
  password: dbConf.password,
  database: dbConf.database,
  ssl: dbConf.ssl,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);