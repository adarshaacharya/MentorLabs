import { store } from 'store';
import { setParticipants, setRoomMessages } from 'store/room/room.slice';
import { Message, Participant, SignalingData } from 'types';
import { socket } from 'utils/socketConfig';
import * as webRTCHandler from './webrtc';
import Peer from 'simple-peer';
import { socketEvents } from 'constants/socketEvents';

type SignalData = {
  signal: Peer.SignalData;
  connUserSocketId: string;
};

type ConnUserData = {
  connUserSocketId: string;
};

type MessageData = {
  userId: string;
  name: string;
  roomId: string;
  text: string;
};

socket.on(socketEvents.CONNECT, () => {
  console.log('sucessfully connected with socket io server', socket.id);
});

socket.on(socketEvents.ROOM_UPDATE, (data: { connectedUsers: Participant[] }) => {
  const { connectedUsers } = data;
  store.dispatch(setParticipants(connectedUsers));
});

// prepare for webrtc conn
socket.on(socketEvents.CONN_PREPARE, (data: ConnUserData) => {
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

  socket.emit(socketEvents.CONN_INIT, { connUserSocketId }); // initialize conn
});

// signaling data is coming from server
socket.on('conn-signal', (data: SignalingData) => {
  webRTCHandler.handleSignalingData(data);
});

// for the user who just join the room
socket.on(socketEvents.CONN_INIT, (data: ConnUserData) => {
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
});

socket.on(socketEvents.UPDATE_MESSAGE, (data: Message) => {
  store.dispatch(setRoomMessages(data));
});

socket.on(socketEvents.USER_DISCONNECTED, (data: { socketId: string }) => {
  webRTCHandler.removePeerConnection(data);
});

/*===============================================================
Functions
===============================================================*/

export const createNewRoom = (userId: string, identity: string, roomId: string) => {
  const data = { userId, identity, roomId };
  socket.emit(socketEvents.CREATE_NEW_ROOM, data);
};

export const joinRoom = (userId: string, identity: string, roomId: string) => {
  const data = {
    userId,
    roomId,
    identity,
  };
  socket.emit(socketEvents.JOIN_ROOM, data);
};

// signal to other peer
export const signalPeerData = (data: SignalData) => {
  socket.emit(socketEvents.CONN_SIGNAL, data);
};

export const sendNewMessage = (data: MessageData) => {
  socket.emit(socketEvents.UPDATE_MESSAGE, data);
};
