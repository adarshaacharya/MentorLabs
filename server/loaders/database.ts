import { ormconfig } from '../config/typeorm.config';
import { Connection, createConnection } from 'typeorm';

export const dbConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(ormconfig);
    console.log(`✅  Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
  } catch (err) {
    console.log(err);
  }
  return null;
};
