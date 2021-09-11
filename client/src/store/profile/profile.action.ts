import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import http from 'utils/http';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async ({ id }: { id: string }, thunkAPI) => {
  try {
    const url = `${config.endpoints.profile.fetchProfile}/${id}`;
    console.log(url);
    const { data } = await http.get(url);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
