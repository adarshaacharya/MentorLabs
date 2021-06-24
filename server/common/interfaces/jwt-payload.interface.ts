import { UserRole } from 'modules/users/user.entity';

export interface JwtPayload {
  user: {
    id: number;
    role: UserRole;
  };
}
