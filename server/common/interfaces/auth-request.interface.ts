import { Role } from '../enums/role.enum';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}
