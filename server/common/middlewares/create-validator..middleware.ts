// optionally you can directly use : https://github.com/arb/celebrate which is more tested solution
import { NextFunction, Response } from 'express';
import * as Joi from 'joi';
import { BadRequest } from '../exceptions';

export const createValidator =
  (schema: Joi.Schema, key = 'body') =>
  (req: any, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req[key]);
    if (error) {
      throw new BadRequest(error.details[0].message);
    }
    next();
  };
