import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from 'types';

export const initialState: AuthState = Object.freeze({
  isAuthenticated: false,
  error: '',
  loading: true,
  user: {},
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
    },
    authSuccess: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    authError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
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
      state.user = {};
      state.error = '';
      state.loading = false;
    },
  },
});

// actions from slice
export const { authStart, authSuccess, authError, logOutSuccess, setCurrentUser } = authSlice.actions;

// The reducer
export default authSlice.reducer;
