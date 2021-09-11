import { createSlice } from '@reduxjs/toolkit';
import { ProfileState } from 'types';
import { fetchProfile } from './profile.action';

export const initialState: ProfileState = Object.freeze({
  status: 'idle',
  user: {},
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = 'pending';
    });
  },
});

export default profileSlice.reducer;
