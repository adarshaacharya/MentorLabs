import { JwtPayload } from '../interfaces/jwt-payload.interface';
import jwt from 'jsonwebtoken';
import { Role } from '../enums/role.enum';

export const generateJwtToken = ({ id, role }: { id: string; role: Role }): string => {
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
