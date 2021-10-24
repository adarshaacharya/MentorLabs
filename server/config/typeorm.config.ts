import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const DATABASE_TYPE = 'postgres';
export const ormconfig: ConnectionOptions = {
  name: 'default',
  type: DATABASE_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test', // in dev : 1 && 1 = 1
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  namingStrategy: new SnakeNamingStrategy(),
};
