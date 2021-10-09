import { Server, Socket } from 'socket.io';
import { SOCKETS_EVENT } from '../../common/constants/socketEvents';
import {
  ConnectedUser,
  ConnUserData,
  CreateNewRoom,
  JoinRoom,
  Room,
  SignalingData,
  SocketMessage,
} from './dtos/socket.dto';

let connectedUsers: Array<ConnectedUser> = [];
let rooms: Array<Room> = [];

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

  const room = rooms.find((room) => room.id === roomId);

  if (!room) {
    console.log('Room not found.');
    return;
  }
  room.connectedUsers = [...room.connectedUsers, newUser];

  socket.join(roomId);

  connectedUsers = [...connectedUsers, newUser];

  room.connectedUsers.forEach((user: ConnectedUser) => {
    if (user.socketId !== socket.id) {
      const data = { connUserSocketId: socket.id };

      io.to(user.socketId).emit('conn-prepare', data);
    }
  });

  io.to(roomId).emit('room-update', { connectedUsers: room.connectedUsers });
};

export const signalingHandler = (io: Server, socket: Socket, data: SignalingData) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id }; // set to ther socket id of sender

  io.to(connUserSocketId).emit('conn-signal', signalingData);
};

export const initializeConnectionHandler = (io: Server, socket: Socket, data: ConnUserData) => {
  const { connUserSocketId } = data;

  const initData = {
    connUserSocketId: socket.id,
  };

  io.to(connUserSocketId).emit('conn-init', initData);
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

export const disconnect = (io: Server, socket: Socket) => {
  const user = connectedUsers.find((user) => user.socketId === socket.id);

  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);

    if (room) {
      room.connectedUsers = room.connectedUsers.filter((user) => user.socketId !== socket.id);

      socket.leave(user.roomId);

      if (room.connectedUsers.length > 0) {
        io.to(room.id).emit('user-disconnected', { socketId: socket.id });

        io.to(room.id).emit('room-update', {
          connectedUsers: room.connectedUsers,
        });
      } else {
        rooms = rooms.filter((r) => r.id !== room.id);
      }
    }
  }
};
