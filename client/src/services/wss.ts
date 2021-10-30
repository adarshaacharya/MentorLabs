import { store } from 'store';
import { setParticipants, setRoomMessages } from 'store/room/room.slice';
import { Message, Participant, SignalingData } from 'types';
import { socket } from 'utils/socketConfig';
import * as webRTCHandler from './webrtc';
import Peer from 'simple-peer';
import { SOCKETS_EVENT } from 'constants/socketEvents';

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

socket.on(SOCKETS_EVENT.CONNECT, () => {
  console.log('sucessfully connected with socket io server', socket.id);
});

socket.on(SOCKETS_EVENT.ROOM_UPDATE, (data: { connectedUsers: Participant[] }) => {
  const { connectedUsers } = data;
  store.dispatch(setParticipants(connectedUsers));
});

// prepare for webrtc conn
socket.on(SOCKETS_EVENT.CONN_PREPARE, (data: ConnUserData) => {
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

  socket.emit(SOCKETS_EVENT.CONN_INIT, { connUserSocketId }); // initialize conn
});

// signaling data is coming from server
socket.on('conn-signal', (data: SignalingData) => {
  webRTCHandler.handleSignalingData(data);
});

// for the user who just join the room
socket.on(SOCKETS_EVENT.CONN_INIT, (data: ConnUserData) => {
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
});

socket.on(SOCKETS_EVENT.UPDATE_MESSAGE, (data: Message) => {
  store.dispatch(setRoomMessages(data));
});

socket.on(SOCKETS_EVENT.USER_DISCONNECTED, (data: { socketId: string }) => {
  webRTCHandler.removePeerConnection(data);
});

/*===============================================================
Functions
===============================================================*/

export const createNewRoom = (userId: string, identity: string, roomId: string) => {
  const data = { userId, identity, roomId };
  socket.emit(SOCKETS_EVENT.CREATE_NEW_ROOM, data);
};

export const joinRoom = (userId: string, identity: string, roomId: string) => {
  const data = {
    userId,
    roomId,
    identity,
  };
  socket.emit(SOCKETS_EVENT.JOIN_ROOM, data);
};

// signal to other peer
export const signalPeerData = (data: SignalData) => {
  socket.emit(SOCKETS_EVENT.CONN_SIGNAL, data);
};

export const sendNewMessage = (data: MessageData) => {
  socket.emit(SOCKETS_EVENT.UPDATE_MESSAGE, data);
};
