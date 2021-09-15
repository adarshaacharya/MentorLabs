import { Action, ThunkAction } from '@reduxjs/toolkit';
import { MentorshipRequestStatus, Role } from 'enums';
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

export interface CreateProfileData extends Omit<Profile, 'id' | 'userId'> {}

export interface MentorshipRequestData {
  background: string;
  expectaion: string;
  message: string;
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
export interface Socials {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
  slack?: string;
  github?: string;
}

export interface Channel {
  site: keyof Socials;
  link: string;
}

export interface Profile {
  id: number;
  title: string;
  description: string;
  tags: string[];
  country: string;
  languages: string[];
  channels: Channel[];
  userId: number;
}

//==============================================================================
// Profile
//==============================================================================
export interface Mentorship extends MentorshipRequestData {
  id: number;
  menteeId: number;
  mentorId: number;
  status: MentorshipRequestStatus;
  mentor: User;
}

//==============================================================================
// State
//==============================================================================

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

export interface AuthState {
  status: Status;
  isAuthenticated: boolean;
  error: string;
  user: User;
}

export interface ErrorState {
  message: string | null;
}

export interface UsersState {
  status: Status;
  mentors: User[];
}

export interface ProfileState {
  status: Status;
  user: User;
}

export interface MentorshipState {
  status: Status;
}
//==============================================================================
// Redux Utilities data types
//==============================================================================

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
