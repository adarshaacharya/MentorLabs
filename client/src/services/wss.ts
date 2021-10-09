import { store } from 'store';
import { setParticipants } from 'store/room/room.slice';
import { Participant, SignalingData } from 'types';
import { socket } from 'utils/socketConfig';
import * as webRTCHandler from './webrtc';
import Peer from 'simple-peer';

type SignalData = {
  signal: Peer.SignalData;
  connUserSocketId: string;
};

type ConnUserData = {
  connUserSocketId: string;
};

socket.on('connect', () => {
  console.log('sucessfully connected with socket io server', socket.id);
});

socket.on('room-update', (data: { connectedUsers: Participant[] }) => {
  const { connectedUsers } = data;
  store.dispatch(setParticipants(connectedUsers));
});

// prepare for webrtc conn
socket.on('conn-prepare', (data: ConnUserData) => {
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

  socket.emit('conn-init', { connUserSocketId }); // initialize conn
});

// signaling data is coming from server
socket.on('conn-signal', (data: SignalingData) => {
  webRTCHandler.handleSignalingData(data);
});

// for the user who just join the room
socket.on('conn-init', (data: ConnUserData) => {
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
});

/*===============================================================
Functions
===============================================================*/

export const createNewRoom = (userId: string, identity: string, roomId: string) => {
  const data = { userId, identity, roomId };
  socket.emit('create-new-room', data);
};

export const joinRoom = (userId: string, identity: string, roomId: string) => {
  const data = {
    userId,
    roomId,
    identity,
  };
  socket.emit('join-room', data);
};

// signal to other peer
export const signalPeerData = (data: SignalData) => {
  socket.emit('conn-signal', data);
};
