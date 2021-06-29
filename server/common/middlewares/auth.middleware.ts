import { AUTH_COOKIE } from '../../common/constants/cookies';
import { NextFunction, Response } from 'express';

import * as jwt from 'jsonwebtoken';

import { Unauthorized } from '../../common/exceptions';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

/**
 * Middleware to check if user is authticated or not
 *
 * @param req
 * @param _res
 * @param next
 */
export const checkJwt = (req: AuthRequest, _res: Response, next: NextFunction) => {
  // check if token exists in cookie on request
  const token = req.cookies[AUTH_COOKIE];
  if (!token) throw new Unauthorized('No token, authorization denied');

  try {
    const decoded: JwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded.user; // attach user from decoded.user to req.user so it can be accessed easily

    next();
  } catch (err) {
    console.error('something wrong with auth middleware');
    throw new Unauthorized('Token not valid');
  }
};
