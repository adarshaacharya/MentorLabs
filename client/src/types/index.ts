import { Action, ThunkAction } from '@reduxjs/toolkit';
import { MentorshipRequestStatus, Role } from 'enums';
import { store } from 'store';
import Peer from 'simple-peer';

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
  title: string;
  background: string;
  expectation: string;
  message: string;
}

export interface MentorshipResponseData {
  date: string;
  startTime: string;
  endTime: string;
  roomId: string;
  message: string;
}

export interface CreateRoomData {
  title: string;
  creatorId: string;
}

export interface JoinRoomData {
  roomId: string;
}
//==============================================================================
// User
//==============================================================================
export interface User {
  id?: string;
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
  id: string;
  title: string;
  description: string;
  tags: string[];
  country: string;
  languages: string[];
  channels: Channel[];
  userId: string;
}

//==============================================================================
// Profile
//==============================================================================
export interface MentorshipRequest extends MentorshipRequestData {
  id: string;
  title: string;
  menteeId: string;
  mentorId: string;
  status: MentorshipRequestStatus;
  mentor?: User; // for student mentor data is available
  mentee?: User; // for teacher student data is available
  createdAt: Date;
  response?: MentorshipResponseData;
}

//==============================================================================
// Room
//==============================================================================
export interface Message {
  userId: string;
  name: string;
  text: string;
}

export interface RoomInfo {
  id: string;
  title: string;
}

export interface JoinRoomResponse {
  roomId: string;
  title: string;
}

export interface SocketCallbackError {
  error: string;
}

export interface Participant {
  id: string;
  identity: string;
  roomId: string;
  socketId: string;
}

export interface SignalingData {
  connUserSocketId: string;
  signal: Peer.SignalData;
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
  requests: MentorshipRequest[];
  request: MentorshipRequest;
}

export interface RoomState {
  id: string;
  title: string;
  status: Status;
  showOverlay: boolean;
  isRoomHost: boolean;
  participants: Participant[];
  messages: Message[];
  error: string;
}
//==============================================================================
// Redux Utilities data types
//==============================================================================

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
