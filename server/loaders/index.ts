import * as express from 'express';
import 'reflect-metadata';
import { dbConnection } from './database';
import server from './express';

export default async (app: express.Application) => {
  await dbConnection.create();
  server(app);
};
