import { ROLE } from '../enums/role.enum';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: ROLE;
  };
}
