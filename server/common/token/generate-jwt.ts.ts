import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import jwt from 'jsonwebtoken';
import { ROLE } from '../enums/role.enum';

export const generateJwtToken = ({ id, role }: { id: number; role: ROLE }): string => {
  const payload: JwtPayload = {
    user: {
      id,
      role,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
