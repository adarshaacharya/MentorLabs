import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler } from '../common/middlewares';
import { router as mentorshipsRoutes } from '../modules/mentorships/mentorships.route';
import { router as roomRoutes } from '../modules/room/room.route';
import { router as usersRoutes } from '../modules/users/users.route';

export default (app: express.Application) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  app.use('/api/users', usersRoutes);
  app.use('/api/mentorships', mentorshipsRoutes);
  app.use('/api/room', roomRoutes);

  app.use(errorHandler);
};
