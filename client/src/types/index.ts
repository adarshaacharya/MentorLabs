import { Action, ThunkAction } from '@reduxjs/toolkit';
import { Role } from 'constants/roles';
import { store } from 'store';

//==============================================================================
// Form Data
//==============================================================================
export interface CreateAccountData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginData {
  email: string;
  password: string;
}

//==============================================================================
// User
//==============================================================================
export interface User {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  role?: Role;
  profile?: Profile;
}

//==============================================================================
// Profile
//==============================================================================
export interface Profile {
  id: number;
  title: string;
  description: string;
  tags: string[];
  country: string;
  languages: string[];
  channels: {};
  userId: number;
}

//==============================================================================
// State
//==============================================================================

export interface AuthState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  isAuthenticated: boolean;
  error: string;
  user: User;
}

export interface ErrorState {
  message: string | null;
}

export interface UsersState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  mentors: User[];
}

//==============================================================================
// Redux Utilities data types
//==============================================================================

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
