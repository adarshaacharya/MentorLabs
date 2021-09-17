import { createSlice } from '@reduxjs/toolkit';
import { MentorshipRequest, MentorshipState } from 'types';
import {
  fetchMentorshipRequestByStudent,
  fetchMentorshipRequestsByStudent,
  sendMentorshipRequest,
} from './mentorship.action';

const initialState: MentorshipState = Object.freeze({
  status: 'idle',
  requests: [],
  request: {} as MentorshipRequest,
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

    builder.addCase(fetchMentorshipRequestByStudent.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchMentorshipRequestByStudent.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.request = payload;
    });

    builder.addCase(fetchMentorshipRequestByStudent.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default mentorshipSlice.reducer;
