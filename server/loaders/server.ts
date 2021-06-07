import cors from 'cors';
import express from 'express';

export default (app: express.Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));
};
