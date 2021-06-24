import { UserRole } from 'constants/options';

//==============================================================================
// Form Data
//==============================================================================
export interface CreateAccountData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

//==============================================================================
// User
//==============================================================================
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

//==============================================================================
// State
//==============================================================================
export interface AuthState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  error?: string;
  user: User | null;
}
