import { createSlice } from '@reduxjs/toolkit';
import { MentorshipState } from 'types';
import { fetchMentorshipRequestsByStudent, sendMentorshipRequest } from './mentorship.action';

const initialState: MentorshipState = Object.freeze({
  status: 'idle',
  requests: [],
});

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMentorshipRequest.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(sendMentorshipRequest.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
    });

    builder.addCase(sendMentorshipRequest.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(fetchMentorshipRequestsByStudent.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchMentorshipRequestsByStudent.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.requests = payload;
    });

    builder.addCase(fetchMentorshipRequestsByStudent.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default mentorshipSlice.reducer;
