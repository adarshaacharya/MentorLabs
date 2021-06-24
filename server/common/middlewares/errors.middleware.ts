import { BaseHttpError } from 'common/exceptions/base-http-error';
import { NextFunction, Request, Response } from 'express';

/**
 *
 * @param error
 * @param _req
 * @param res
 * @param next
 */
export const errorHandler = (error: BaseHttpError, _req: Request, res: Response, next: NextFunction) => {
  res.statusCode = error.statusCode || 500;
  res.json(error);
  console.log(error);
};
