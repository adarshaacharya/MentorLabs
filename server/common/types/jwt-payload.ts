import { UserRole } from 'modules/users/user.entity';

export type JwtPayload = {
  id: number;
  role: UserRole;
};
