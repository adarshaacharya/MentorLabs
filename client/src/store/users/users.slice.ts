import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from 'types';
import { fetchMentors } from './users.action';

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
  },
});

export default usersSlice.reducer;
