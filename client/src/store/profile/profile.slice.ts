import { createSlice } from '@reduxjs/toolkit';
import { ProfileState } from 'types';
import { createProfile, fetchProfile } from './profile.action';

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

    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.user = payload;
    });

    builder.addCase(createProfile.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(createProfile.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      // state.user.profile = payload;
    });
  },
});

export default profileSlice.reducer;
