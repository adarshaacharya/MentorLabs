import { Server, Socket } from 'socket.io';
import { SOCKETS_EVENT } from '../../common/constants/socketEvents';
import { NotFound } from '../../common/exceptions';
import { ConnectedUser, CreateNewRoom, CreateRoom, JoinRoom, SocketMessage } from './dtos/socket.dto';

let connectedUsers: Array<ConnectedUser> = [];
let rooms: Array<CreateRoom> = [];

export const createNewRoom = (socket: Socket, data: CreateNewRoom) => {
  console.log('host is creating new room');

  const { roomId, identity, userId } = data;

  const newUser = {
    id: userId,
    identity,
    socketId: socket.id,
    roomId,
  };

  connectedUsers = [...connectedUsers, newUser];

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };

  socket.join(roomId);

  rooms = [...rooms, newRoom];

  socket.emit('room-update', { connectedUsers: newRoom.connectedUsers });
};

export const joinRoom = (io: Server, socket: Socket, data: JoinRoom) => {
  const { identity, roomId, userId } = data;

  const newUser = {
    id: userId,
    identity,
    socketId: socket.id,
    roomId,
  };
  console.log(newUser);

  const room = rooms.find((room) => room.id === roomId);

  if (!room) {
    throw new NotFound('Room not found');
  }
  room.connectedUsers = [...room.connectedUsers, newUser];

  socket.join(roomId);

  connectedUsers = [...connectedUsers, newUser];

  io.to(roomId).emit('room-update', { connectedUsers: room.connectedUsers });
};

export const sendMessage = (io: Server, messageData: SocketMessage, callback: () => void) => {
  try {
    const { roomId, text } = messageData;
    const message = { text };
    io.to(roomId).emit(SOCKETS_EVENT.UPDATE_MESSAGE, message);

    callback();
  } catch (error) {
    console.log(error);
  }
};
