import { Forbidden } from '../../common/exceptions';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';

export const checkRole = (roles: string[]) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) throw new Forbidden('Forbidden area');

    if (!roles.includes(user.role)) {
      throw new Forbidden('Forbidden area');
    }

    next();
  };
};
