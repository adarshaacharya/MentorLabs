import { JwtPayload } from '../interfaces/jwt-payload.interface';
import jwt from 'jsonwebtoken';
import { Role } from '../enums/role.enum';

export const generateJwtToken = ({ id, role }: { id: string; role: Role }): string => {
  console.log(process.env.JWT_SECRET, process.env.JWT_EXPIRATION);
  const payload: JwtPayload = {
    user: {
      id,
      role,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
