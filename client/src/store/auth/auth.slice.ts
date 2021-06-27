import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from 'constants/storage';
import { AuthState, User } from 'types';
import * as storage from 'utils/storage';

export const initialState: AuthState = Object.freeze({
  token: storage.get(ACCESS_TOKEN) || '',
  isAuthenticated: false,
  error: '',
  loading: false,
  user: null,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
    },
    authSuccess: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    authError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.token = '';
      state.isAuthenticated = false;
      state.loading = false;
    },
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logOutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = '';
      state.user = null;
      state.error = '';
      state.loading = false;
    },
  },
});

// actions from slice
export const { authStart, authSuccess, authError, logOutSuccess, setCurrentUser } = authSlice.actions;

// The reducer
export default authSlice.reducer;
