import { errorHandler } from '../common/middlewares/errors.middleware';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { router as usersRoutes } from '../modules/users/users.route';

export default (app: express.Application) => {
  app.use(cors());

  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  app.use('/api/users', usersRoutes);

  app.use(errorHandler);
};
