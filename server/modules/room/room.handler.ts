import { Server, Socket } from 'socket.io';
import Container from 'typedi';
import {
  ConnectedUser,
  ConnUserData,
  CreateNewRoom,
  JoinRoom,
  MessageData,
  Room,
  SignalingData,
} from './dtos/socket.dto';
import { RoomService } from './room.service';
import { socketEvents } from '../../common/constants/socketEvents';

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

  socket.emit(socketEvents.ROOM_UPDATE, { connectedUsers: newRoom.connectedUsers });
};

export const joinRoom = async (io: Server, socket: Socket, data: JoinRoom) => {
  const roomServiceInstance = Container.get(RoomService);

  const { identity, roomId, userId } = data;

  const newUser = {
    id: userId,
    identity,
    socketId: socket.id,
    roomId,
  };

  const databaseRoomExists = await roomServiceInstance.findRoomById(roomId);

  if (!databaseRoomExists) {
    console.log('Room doesnot exists in database.');
    return;
  }

  const room = rooms.find((room) => room.id === roomId);

  // create new room if there isn't room in memory (socket)
  if (!room) {
    const newRoom = {
      id: roomId,
      connectedUsers: [newUser],
    };
    rooms = [...rooms, newRoom];
    socket.join(roomId);

    rooms = [...rooms, newRoom];

    socket.emit(socketEvents.ROOM_UPDATE, { connectedUsers: newRoom.connectedUsers });
  } else {
    room.connectedUsers = [...room.connectedUsers, newUser];

    socket.join(roomId);

    connectedUsers = [...connectedUsers, newUser];

    room.connectedUsers.forEach((user: ConnectedUser) => {
      if (user.socketId !== socket.id) {
        const data = { connUserSocketId: socket.id };

        io.to(user.socketId).emit(socketEvents.CONN_PREPARE, data);
      }
    });

    io.to(roomId).emit(socketEvents.ROOM_UPDATE, { connectedUsers: room.connectedUsers });
  }
};

export const signalingHandler = (io: Server, socket: Socket, data: SignalingData) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id }; // set to ther socket id of sender

  io.to(connUserSocketId).emit(socketEvents.CONN_SIGNAL, signalingData);
};

export const initializeConnectionHandler = (io: Server, socket: Socket, data: ConnUserData) => {
  const { connUserSocketId } = data;

  const initData = {
    connUserSocketId: socket.id,
  };

  io.to(connUserSocketId).emit(socketEvents.CONN_INIT, initData);
};

export const sendMessage = (io: Server, messageData: MessageData) => {
  try {
    const { userId, name, roomId, text } = messageData;
    const data = { userId, name, text };
    io.to(roomId).emit(socketEvents.UPDATE_MESSAGE, data);
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
        io.to(room.id).emit(socketEvents.USER_DISCONNECTED, { socketId: socket.id });

        io.to(room.id).emit(socketEvents.ROOM_UPDATE, {
          connectedUsers: room.connectedUsers,
        });
      } else {
        rooms = rooms.filter((r) => r.id !== room.id);
      }
    }
  }
};
