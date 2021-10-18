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

// cleaned user data
export interface CleanUserData {
  id: string;
  name: string;
  title: string; // 'software developer
  skills?: string[]; // for mentor
  interests?: string[]; // for mentee
  languages: string[];
  country: string;
  type: 'user'; // common column for mentor and mentee
}

export interface JaccardUser {
  id: string;
  jaccardIndex: number;
}
