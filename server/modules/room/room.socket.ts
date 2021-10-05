import http from 'http';
import { Server, Socket } from 'socket.io';
import Container from 'typedi';
import { SOCKETS_EVENT } from '../../common/constants/socketEvents';
import { UsersService } from '../users/users.service';
import { RoomService } from './room.service';

type CreateRoomData = {
  creatorId: string;
  title: string;
};
type JoinRoomData = {
  roomId: string;
  participantId: string;
};
type SocketCallback = ({ error }: { error: string }) => void;

type SocketMessage = {
  roomId: string;
  text: string;
};

type SignalData = {
  roomId: string;
  signal: string;
};

type LeaveRoomData = {
  roomId: string;
  userId: string;
};

type Users = {
  [key: string]: string[];
};

type SocketToRoom = {
  [key: string]: string;
};

type SendSignalPayload = {
  signal: unknown;
  userToSignal: string;
  callerId: string;
};

type ReturningSignalPayload = {
  signal: unknown;
  callerId: string;
};

const socketOptions = {
  cors: {
    origin: '*',
  },
};

export const roomSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, socketOptions);

  const users: Users = {}; // @todo: rename to rooms
  const socketToRoom: SocketToRoom = {}; // every single time someone joins room determine which room they go to, i.e which socket belongs to which room ; socket -> room -> find roomId -> go to users colelction to find room

  /**
   * connect socket event
   */
  io.on(SOCKETS_EVENT.CONNECT, (socket: Socket) => {
    console.log('✅ Connected to room.', socket.id);

    // send message
    socket.on(SOCKETS_EVENT.SEND_MESSAGE, (messageData: SocketMessage, callback) => {
      try {
        const { roomId, text } = messageData;
        const message = { text };
        io.to(roomId).emit(SOCKETS_EVENT.UPDATE_MESSAGE, message);

        callback();
      } catch (error) {
        console.log(error);
      }
    });

    // when user join room
    socket.on(SOCKETS_EVENT.JOIN_ROOM, (roomId: string) => {
      if (users[roomId]) {
        const length = users[roomId].length;

        if (length === 4) {
          socket.emit(SOCKETS_EVENT.ROOM_FULL);
          return;
        }

        users[roomId].push(socket.id);
      } else {
        users[roomId] = [socket.id];
      }

      socketToRoom[socket.id] = roomId;

      const usersInThisRoom = users[roomId].filter((id) => id !== socket.id); // return all the users except who's emitting event

      socket.emit(SOCKETS_EVENT.ALL_USERS, usersInThisRoom);
    });

    // sending signal to every people in room
    socket.on(SOCKETS_EVENT.SENDING_SIGNAL, (payload: SendSignalPayload) => {
      const { userToSignal, callerId, signal } = payload;

      io.to(userToSignal).emit(SOCKETS_EVENT.USER_JOINED_ROOM, { signal, callerId });
    });

    socket.on(SOCKETS_EVENT.RETURNING_SIGNAL, (payload: ReturningSignalPayload) => {
      io.to(payload.callerId).emit(SOCKETS_EVENT.RECEIVING_RETURNED_SIGNAL, { signal: payload.signal, id: socket.id });
    });

    socket.on(SOCKETS_EVENT.DISCONNECT, () => {
      const roomId = socketToRoom[socket.id];
      let room = users[roomId];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomId] = room;
      }

      socket.broadcast.emit(SOCKETS_EVENT.USER_LEFT, socket.id);
    });
  });
};
