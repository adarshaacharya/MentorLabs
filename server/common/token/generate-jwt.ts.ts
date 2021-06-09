import { JwtPayload } from '../../common/types/jwt-payload';
import jwt from 'jsonwebtoken';

export const generateJwtToken = ({ id, role }: JwtPayload): string => {
  const payload = {
    user: {
      id,
      role,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
