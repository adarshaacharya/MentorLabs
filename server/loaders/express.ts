import { errorHandler } from '../common/middlewares/errors.middleware';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { router as usersRoutes } from '../modules/users/users.route';

export default (app: express.Application) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Use Helmet to secure the app by setting various HTTP headers
  app.use(helmet());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());

  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  // Load API routes
  app.use('/api/users', usersRoutes);

  // Error handlers middleware
  app.use(errorHandler);
};
