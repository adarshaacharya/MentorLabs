import { ormconfig } from '../config/typeorm.config';
import { Connection, createConnection, useContainer } from 'typeorm';
import Container from 'typedi';

export const dbConnection = {
  async create(): Promise<Connection | null> {
    // typedi + typeorm
    useContainer(Container);

    try {
      const conn = await createConnection(ormconfig);
      console.log(
        `✅  Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`,
      );
    } catch (err) {
      console.log(err);
    }
    return null;
  },
};
