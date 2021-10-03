import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, RoomInfo, RoomState } from 'types';
import { createRoom, joinRoom } from './room.action';

const initialState: RoomState = Object.freeze({
  id: '',
  title: '',
  status: 'idle',
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
  messages: [],
  error: '',
});

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setLocalMicrophoneEnabled(state, action: PayloadAction<boolean>) {
      state.localMicrophoneEnabled = action.payload;
    },
    setLocalCameraEnabled(state, action: PayloadAction<boolean>) {
      state.localCameraEnabled = action.payload;
    },

    setRoomMessages(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },

    leaveCurrentRoom(state) {
      state.localCameraEnabled = true;
      state.localMicrophoneEnabled = true;
      state.screenSharingActive = false;
      state.messages = [];
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

export const {
  // setLocalStream,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
  // setRoomInformation,
  setRoomMessages,
  // setRemoteStream,
  leaveCurrentRoom,
  clearRoomError,
} = roomSlice.actions;

export default roomSlice.reducer;
