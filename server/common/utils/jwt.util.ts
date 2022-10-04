import { JwtPayload } from '../interfaces/jwt-payload.interface';
import jwt from 'jsonwebtoken';
import { Role } from '../enums/role.enum';
import { getEnv } from './getEnv.util';

export const generateJwtToken = ({ id, role }: { id: string; role: Role }): string => {
  const payload: JwtPayload = {
    user: {
      id,
      role,
    },
  };

  return jwt.sign(payload, getEnv('JWT_SECRET') as string, {
    expiresIn: getEnv('JWT_EXPIRATION'),
  });
};
