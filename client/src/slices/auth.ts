import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, CreateAccountData, User } from 'types';
import http from 'utils/http';
import * as storage from 'utils/storage';
import config from 'config';
import { AppDispatch, AppThunk } from 'app/store';
import { ACCESS_TOKEN } from 'constants/storage';

export const createAccount =
  ({ name, email, password, role }: CreateAccountData): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      authStart();
      const url = config.endpoints.auth.createAccount;
      const {
        data: { token },
      } = await http.post(url, { name, email, password, role });

      dispatch(authSuccess(token));
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      dispatch(authError(message));
    }
  };

export const initialState: AuthState = Object.freeze({
  token: storage.get(ACCESS_TOKEN),
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
      state.isAuthenticated = false;
      state.loading = false;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = '';
      state.loading = false;
    },
  },
});

// actions from slice
export const { authStart, authSuccess, authError, logoutSuccess, setUser } = authSlice.actions;

// The reducer
export default authSlice.reducer;
