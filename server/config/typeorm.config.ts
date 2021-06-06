import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'prod',
  logging: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
  entities: [],
  namingStrategy: new SnakeNamingStrategy(),
};
