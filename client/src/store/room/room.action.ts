import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { RoomInfo } from 'types';
import http from 'utils/http';

export const createRoom = createAsyncThunk('room/createRoom', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.room.createRoom;
    const { data } = await http.get<RoomInfo>(url);
    return data;
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.data.message);
  }
});
