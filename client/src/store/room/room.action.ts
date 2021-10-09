import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { CreateRoomData, RoomInfo } from 'types';
import http from 'utils/http';

export const createRoom = createAsyncThunk('room/createRoom', async (values: CreateRoomData, thunkAPI) => {
  try {
    const url = config.endpoints.room.createRoom;
    const { data } = await http.post<RoomInfo>(url, values);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const joinRoom = createAsyncThunk('room/joinRoom', async (id: string, thunkAPI) => {
  try {
    const url = config.endpoints.room.joinRoom;
    const { data } = await http.post<RoomInfo>(url, { id });
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
