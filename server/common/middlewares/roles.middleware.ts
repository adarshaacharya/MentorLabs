import { NextFunction, Response } from 'express';
import { ROLE } from '../../common/enums/role.enum';
import { Forbidden } from '../../common/exceptions';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';

/**
 * middleware to check role of user
 * here Array<ROLE> is used as type :  Array of typeof enum ROLE
 */
export const checkRole = (roles: Array<ROLE>) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) throw new Forbidden('Forbidden area');

    if (!roles.includes(user.role)) {
      throw new Forbidden('Forbidden area');
    }

    next();
  };
};
