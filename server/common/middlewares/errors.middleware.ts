import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.statusCode = error.statusCode || 500;
  res.json(error);
  console.log(error);
};