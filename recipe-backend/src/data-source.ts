import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Data } from './entity/data';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'recipe-database.cn4aqu2eid9a.us-east-1.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'Thirdfloor225',
  database: 'recipes',
  schema: 'public',
  entities: [Data],
  ssl: {
    rejectUnauthorized: false,
  },
});
