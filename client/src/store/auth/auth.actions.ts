import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { CreateAccountData, LoginData, Profile, User } from 'types';
import http from 'utils/http';

export const loadCurrentUser = createAsyncThunk('auth/loadCurrentUser', async (_, thunkAPI) => {
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

export const loadCurrentUserProfile = createAsyncThunk('auth/loadCurrentUserProfile', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.auth.profile;
    const { data } = await http.get<Profile>(url);
    return data;
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

export const logIn = createAsyncThunk('auth/logIn', async ({ email, password }: LoginData, thunkAPI) => {
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

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.auth.logout;
    await http.post(url);
  } catch (err) {
    return thunkAPI.rejectWithValue('Error in logout');
  }
});
