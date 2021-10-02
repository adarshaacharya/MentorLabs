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
    setRemoteStream(state, action: PayloadAction<any>) {
      state.remoteStream = action.payload;
    },
    leaveCurrentRoom(state) {
      state.localStream = null;
      state.localCameraEnabled = true;
      state.localMicrophoneEnabled = true;
      state.screenSharingActive = false;
      state.remoteStream = null;
      state.info.roomId = '';
      state.info.title = '';
      state.messages = [];
    },
  },
});

export const {
  setLocalStream,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
  setRoomInformation,
  setRoomMessages,
  setRemoteStream,
  leaveCurrentRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
