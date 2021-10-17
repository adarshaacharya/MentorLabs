import { Profile } from '../../modules/users/entities/profile.entity';
import { Role } from '../enums';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  profile: Profile;
}
