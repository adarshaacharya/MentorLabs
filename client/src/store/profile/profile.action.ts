import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { User } from 'types';
import http from 'utils/http';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (id: string, thunkAPI) => {
  try {
    const url = `${config.endpoints.profile.fetchProfile}/${id}`;
    const { data } = await http.get<User>(url);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
