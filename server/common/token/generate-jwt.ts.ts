import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import jwt from 'jsonwebtoken';
import { UserRole } from 'modules/users/user.entity';

export const generateJwtToken = ({ id, role }: { id: number; role: UserRole }): string => {
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
