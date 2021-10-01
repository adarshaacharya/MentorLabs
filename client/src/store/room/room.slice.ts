import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, RoomInfo, RoomState } from 'types';

const initialState: RoomState = Object.freeze({
  localStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
  remoteStream: null,
  info: {
    roomId: '',
    title: '',
  },
  messages: [],
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
    setRoomInformation(state, action: PayloadAction<RoomInfo>) {
      state.info = action.payload;
    },
    setRoomMessages(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { setLocalStream, setLocalCameraEnabled, setLocalMicrophoneEnabled, setRoomInformation, setRoomMessages } =
  roomSlice.actions;

export default roomSlice.reducer;
