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

const socketOptions = {
  cors: {
    origin: '*',
  },
};

export const roomSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, socketOptions);

  const roomServiceInstance = Container.get(RoomService);
  const userServiceInstance = Container.get(UsersService);

  /**
   * connect socket event
   */
  io.on(SOCKETS_EVENT.CONNECT, (socket: Socket) => {
    console.log('✅ Connected to room.', socket.id);

    // create new room
    socket.on(SOCKETS_EVENT.CREATE_ROOM, async (roomData: CreateRoomData) => {
      try {
        const room = await roomServiceInstance.createRoom(roomData);
        const user = await userServiceInstance.findOneById(roomData.creatorId);
        const roomId = room.id;

        socket.join(roomId); // ❤️ join this socket instance to roomId

        const data = { roomId, title: room.title };
        io.to(roomId).emit(SOCKETS_EVENT.CREATED_ROOM, data);

        const message = {
          text: `${user.name} created room.`,
          notification: true,
        };
        io.to(roomId).emit(SOCKETS_EVENT.UPDATE_MESSAGE, message);
      } catch (error) {
        console.log('Error in creating room', error);
      }
    });

    // join existing room
    socket.on(SOCKETS_EVENT.JOIN_ROOM, async (roomData: JoinRoomData, callback: SocketCallback) => {
      try {
        const { roomId, participantId } = roomData;
        const room = await roomServiceInstance.findRoomById(roomId);

        if (!room) {
          return callback({ error: "Room with given id doesn't exists." });
        }

        const user = await userServiceInstance.findOneById(participantId);

        socket.join(roomId); // ❤️

        const data = { roomId: room.id, title: room.title };
        io.to(roomId).emit(SOCKETS_EVENT.JOINED_ROOM, data);

        const message = {
          text: `${user.name} joined room.`,
          notification: true,
        };
        io.to(roomId).emit(SOCKETS_EVENT.UPDATE_MESSAGE, message);
      } catch (error) {
        console.log(error);
        return callback({ error: 'Error in joining room.' });
      }
    });

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

    socket.on(SOCKETS_EVENT.SEND_SIGNAL, async (signalData: SignalData, callback: SocketCallback) => {
      const { roomId, signal } = signalData;

      if (!roomId) {
        return callback({ error: 'Empty room id.' });
      }

      const room = await roomServiceInstance.findRoomById(roomId);

      if (!room) {
        return callback({ error: "Room with given id doesn't exists." });
      }

      socket.to(roomId).emit(SOCKETS_EVENT.RECEIVE_SIGNAL, signal);
    });

    socket.on(SOCKETS_EVENT.LEAVE_ROOM, async (roomData: LeaveRoomData) => {
      const { roomId, userId } = roomData;

      const user = await userServiceInstance.findOneById(userId);

      const message = {
        text: `${user.name} has left room.`,
        notification: true,
      };
      io.to(roomId).emit(SOCKETS_EVENT.UPDATE_MESSAGE, message);

      socket.leave(socket.id);
    });
  });
};
