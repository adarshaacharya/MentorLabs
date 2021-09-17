import { createAsyncThunk } from '@reduxjs/toolkit';
import { MentorshipRequest, MentorshipRequestData } from 'types';
import config from 'config';
import http from 'utils/http';

export const sendMentorshipRequest = createAsyncThunk(
  'mentorship/sendMentorshipRequest',
  async ({ values, mentorId }: { values: MentorshipRequestData; mentorId: string }, thunkAPI) => {
    try {
      const url = `${config.endpoints.mentorship.sendMentorshipRequest}/${mentorId}`;
      const {
        data: { ok },
      } = await http.post<{ ok: boolean }>(url, values);
      return ok;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchMentorshipRequestsByStudent = createAsyncThunk(
  'mentorship/fetchMentorshipRequestsByStudent',
  async (_, thunkAPI) => {
    try {
      const url = config.endpoints.mentorship.fetchMentorshipRequestsByStudent;
      const { data } = await http.get<MentorshipRequest[]>(url);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchMentorshipRequestByStudent = createAsyncThunk(
  'mentorship/fetchMentorshipRequestByStudent',
  async (_, thunkAPI) => {
    try {
      const url = config.endpoints.mentorship.fetchMentorshipRequestByStudent;
      const { data } = await http.get<MentorshipRequest>(url);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
