import { createAsyncThunk } from '@reduxjs/toolkit';
import { MentorshipRequestData } from 'types';
import config from 'config';
import http from 'utils/http';

export const sendMentorshipRequest = createAsyncThunk(
  'mentorship/sendRequest',
  async ({ values, mentorId }: { values: MentorshipRequestData; mentorId: string }, thunkAPI) => {
    try {
      const url = `${config.endpoints.mentorship.sendMentorshipRequest}/${mentorId}`;
      const {
        data: { ok },
      } = await http.post<{ ok: boolean }>(url, values);
      console.log(ok);
      return ok;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
