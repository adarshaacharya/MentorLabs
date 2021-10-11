import { createSlice } from '@reduxjs/toolkit';
import { ProfileState } from 'types';
import { createProfile, fetchProfile } from './profile.action';

export const initialState: ProfileState = Object.freeze({
  status: 'idle',
  user: {},
  error: '',
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
      state.user = payload;
      state.status = 'resolved';
    });

    builder.addCase(createProfile.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(createProfile.fulfilled, (state, { payload }) => {
      state.user.profile = payload;
      state.status = 'resolved';
    });

    builder.addCase(createProfile.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
  },
});

export default profileSlice.reducer;
