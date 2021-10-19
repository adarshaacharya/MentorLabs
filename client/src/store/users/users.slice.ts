import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from 'types';
import { fetchMentors, fetchRecommendedMentors } from './users.action';

export const initialState: UsersState = Object.freeze({
  status: 'idle',
  mentors: [],
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMentors.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchMentors.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.mentors = payload;
    });

    builder.addCase(fetchMentors.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(fetchRecommendedMentors.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchRecommendedMentors.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.mentors = payload;
    });

    builder.addCase(fetchRecommendedMentors.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default usersSlice.reducer;
