import * as express from 'express';
import 'reflect-metadata';
import { dbConnection } from './database';
import server from './server';

export default async (app: express.Application) => {
  await dbConnection();
  server(app);
};
