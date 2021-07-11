import { Role } from '../enums/role.enum';

export interface JwtPayload {
  user: {
    id: number;
    role: Role;
  };
}
