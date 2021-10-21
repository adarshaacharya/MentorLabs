import { errorHandler } from '../common/middlewares';
import cors from 'cors';
import helmet from 'helmet';
import express, { Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { router as usersRoutes } from '../modules/users/users.route';
import { router as mentorshipsRoutes } from '../modules/mentorships/mentorships.route';
import { router as roomRoutes } from '../modules/room/room.route';

export default (app: express.Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());

  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  app.use('/api/users', usersRoutes);
  app.use('/api/mentorships', mentorshipsRoutes);
  app.use('/api/room', roomRoutes);

  app.use(errorHandler);

  // Serve static files in prod env
  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')));
    app.get('*', (_, res: Response): void => {
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
  }
};
