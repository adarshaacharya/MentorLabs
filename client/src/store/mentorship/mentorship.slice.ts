import { createSlice } from '@reduxjs/toolkit';
import { MentorshipRequest, MentorshipState } from 'types';
import {
  createMentorshipResponse,
  fetchMentorshipRequestByStudent,
  fetchMentorshipRequestOfMentor,
  fetchMentorshipRequestsByStudent,
  fetchMentorshipRequestsOfMentor,
  sendMentorshipRequest,
  updateMentorshipRequestStatus,
} from './mentorship.action';

const initialState: MentorshipState = Object.freeze({
  status: 'idle',
  requests: [],
  request: {} as MentorshipRequest,
  error: '',
});

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMentorshipRequest.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(sendMentorshipRequest.fulfilled, (state) => {
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

    builder.addCase(fetchMentorshipRequestsOfMentor.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchMentorshipRequestsOfMentor.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.requests = payload;
    });

    builder.addCase(fetchMentorshipRequestsOfMentor.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(fetchMentorshipRequestOfMentor.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchMentorshipRequestOfMentor.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.request = payload;
    });

    builder.addCase(fetchMentorshipRequestOfMentor.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(updateMentorshipRequestStatus.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(updateMentorshipRequestStatus.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.request = payload;
    });

    builder.addCase(updateMentorshipRequestStatus.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(createMentorshipResponse.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(createMentorshipResponse.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.request.response = payload;
    });

    builder.addCase(createMentorshipResponse.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
  },
});

export default mentorshipSlice.reducer;
