import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'types';
import { createAccount, loadCurrentUser, logIn, logOut } from './auth.actions';

export const initialState: AuthState = Object.freeze({
  isAuthenticated: false,
  error: '',
  status: 'idle',
  user: {},
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = '';
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadCurrentUser.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.status = 'resolved';
      state.user = payload;
    });

    builder.addCase(loadCurrentUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.status = 'rejected';
    });

    builder.addCase(createAccount.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(createAccount.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.status = 'resolved';
      state.user = payload;
    });

    builder.addCase(createAccount.rejected, (state, action) => {
      state.error = action.error as string;
      state.isAuthenticated = false;
      state.status = 'rejected';
    });

    builder.addCase(logIn.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.status = 'resolved';
      state.user = payload;
    });

    builder.addCase(logIn.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.isAuthenticated = false;
      state.status = 'rejected';
    });

    builder.addCase(logOut.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(logOut.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.status = 'resolved';
      state.user = {};
    });

    builder.addCase(logOut.rejected, (state) => {
      state.isAuthenticated = false;
      state.status = 'rejected';
      state.user = {};
    });
  },
});

// actions from slice
export const { clearAuthError } = authSlice.actions;

// The reducer
export default authSlice.reducer;
