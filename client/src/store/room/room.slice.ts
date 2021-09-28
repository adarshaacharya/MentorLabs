import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = Object.freeze({
  localStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
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
