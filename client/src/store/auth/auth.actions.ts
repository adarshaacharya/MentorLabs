import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import config from 'config';
import { AppDispatch, AppThunk, CreateAccountData, LoginData, User } from 'types';
import http from 'utils/http';

export const loadCurrentUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.auth.me;
    const {
      data: { user },
    } = await http.get<{ user: User }>(url);
    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const createAccount = createAsyncThunk(
  'auth/createAccount',
  async ({ name, email, password, role }: CreateAccountData, thunkAPI) => {
    try {
      const url = config.endpoints.auth.createAccount;
      const {
        data: { user },
      } = await http.post<{ user: User }>(url, { name, email, password, role });
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const logIn = createAsyncThunk('auth/login', async ({ email, password }: LoginData, thunkAPI) => {
  try {
    const url = config.endpoints.auth.login;
    const {
      data: { user },
    } = await http.post<{ user: User }>(url, { email, password });
    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.auth.logout;
    await http.post(url);
  } catch (err) {
    return thunkAPI.rejectWithValue('Error in logout');
  }
});

/**
export const loadCurrentUser = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authStart());
    const url = config.endpoints.auth.me;
    const {
      data: { user },
    } = await http.get(url);
    dispatch(setCurrentUser(user));
  } catch (err) {
    const {
      response: {
        data: { message },
      },
    } = err;
    dispatch(authError(message));
  }
};

export const createAccount =
  ({ name, email, password, role }: CreateAccountData): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authStart());
      const url = config.endpoints.auth.createAccount;
      await http.post(url, { name, email, password, role });
      dispatch(authSuccess());
    } catch (err) {
      console.log(err.response.data);
      const {
        response: {
          data: { message },
        },
      } = err;
      dispatch(authError(message));
    }
  };

export const logIn =
  ({ email, password }: LoginData): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authStart());
      const url = config.endpoints.auth.login;
      await http.post(url, { email, password });
      dispatch(authSuccess());
    } catch (err) {
      console.log(err.response.data);
      const {
        response: {
          data: { message },
        },
      } = err;
      dispatch(authError(message));
    }
  };

export const logOut = (): AppThunk => async (dispatch: AppDispatch) => {
  const url = config.endpoints.auth.logout;
  await http.post(url);
  dispatch(logOutSuccess());
};

 */
