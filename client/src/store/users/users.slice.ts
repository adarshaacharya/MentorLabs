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
    builder.addCase(fetchMentors.pending, (state, action) => {
      state.status = 'pending';
    });

    builder.addCase(fetchMentors.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.mentors.push(action.payload);
    });
  },
});

export default usersSlice.reducer;
