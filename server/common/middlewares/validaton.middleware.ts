import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BadRequest } from '../../common/exceptions';
import { RequestHandler } from 'express';

/**
 * validation middleware for class-validator
 */
export function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req, _, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new BadRequest(message));
      } else {
        next();
      }
    });
  };
}
