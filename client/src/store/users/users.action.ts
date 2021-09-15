import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { User } from 'types';
import http from 'utils/http';

export const fetchMentors = createAsyncThunk('users/fetchMentors', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.users.fetchMentors;
    const { data } = await http.get<User[]>(url);
    console.log(data.map((x) => x));
    return data;
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.data.message);
  }
});
