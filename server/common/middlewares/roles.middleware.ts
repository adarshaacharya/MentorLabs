import { NextFunction, Response } from 'express';
import { Role } from '../../common/enums';
import { Forbidden } from '../../common/exceptions';
import { AuthRequest } from '../../common/interfaces';

/**
 * middleware to check role of user
 * here Array<Role> is used as type :  Array of typeof enum Role
 */
export const checkRole = (roles: Array<Role>) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) throw new Forbidden('Forbidden area');

    if (!roles.includes(user.role)) {
      throw new Forbidden('Forbidden area');
    }

    next();
  };
};
