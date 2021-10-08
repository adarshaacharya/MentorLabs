import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Participant, RoomState } from 'types';
import { createRoom, joinRoom } from './room.action';

const initialState: RoomState = Object.freeze({
  id: '',
  title: '',
  status: 'idle',
  isRoomHost: false,
  showOverlay: true,
  participants: [],
  messages: [],
  error: '',
});

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setIsRoomHost(state, action: PayloadAction<boolean>) {
      state.isRoomHost = action.payload;
    },
    setRoomMessages(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },

    setParticipants(state, action: PayloadAction<Participant[]>) {
      state.participants = action.payload;
    },
    setShowOverlay(state, action: PayloadAction<boolean>) {
      state.showOverlay = action.payload;
    },
    clearRoomError(state) {
      state.error = '';
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createRoom.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(createRoom.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.id = payload.id;
      state.title = payload.title;
    });

    builder.addCase(createRoom.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });

    builder.addCase(joinRoom.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(joinRoom.fulfilled, (state, { payload }) => {
      state.status = 'resolved';
      state.id = payload.id;
      state.title = payload.title;
    });

    builder.addCase(joinRoom.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
  },
});

export const { setRoomMessages, setShowOverlay, clearRoomError, setIsRoomHost, setParticipants } = roomSlice.actions;

export default roomSlice.reducer;
