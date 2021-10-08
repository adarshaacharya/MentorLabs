import { store } from 'store';
import { setParticipants } from 'store/room/room.slice';
import { Participant } from 'types';
import { socket } from 'utils/socketConfig';

socket.on('connect', () => {
  console.log('sucessfully connected with socket io server', socket.id);
});

socket.on('room-update', (data: { connectedUsers: Participant[] }) => {
  const { connectedUsers } = data;
  store.dispatch(setParticipants(connectedUsers));
});

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
