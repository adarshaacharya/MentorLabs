import { Action, ThunkAction } from '@reduxjs/toolkit';
import { UserRole } from 'constants/options';
import { store } from 'store';

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
  avatar: string;
  role: UserRole;
}

//==============================================================================
// State
//==============================================================================
export interface AuthState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string;
  user: User | null;
}

//==============================================================================
// Redux Utilities data types
//==============================================================================

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
