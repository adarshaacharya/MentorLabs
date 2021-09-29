import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomState } from 'types';

const initialState: RoomState = Object.freeze({
  localStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
  remoteStream: null,
});

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setLocalStream(state, action: PayloadAction<MediaStream>) {
      state.localStream = action.payload;
    },
    setLocalMicrophoneEnabled(state, action: PayloadAction<boolean>) {
      state.localMicrophoneEnabled = action.payload;
    },
    setLocalCameraEnabled(state, action: PayloadAction<boolean>) {
      state.localCameraEnabled = action.payload;
    },
  },
});

export const { setLocalStream, setLocalCameraEnabled, setLocalMicrophoneEnabled } = roomSlice.actions;

export default roomSlice.reducer;
