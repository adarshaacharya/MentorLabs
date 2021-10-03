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

  const roomServiceInstance = Container.get(RoomService);
  const userServiceInstance = Container.get(UsersService);

  const users: Users = {};
  const socketToRoom: SocketToRoom = {};

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

    // leave room
    socket.on(SOCKETS_EVENT.LEAVE_ROOM, async (roomData: LeaveRoomData) => {
      const { roomId, userId } = roomData;

      const user = await userServiceInstance.findOneById(userId);

      const message = {
        text: `${user.name} has left room.`,
        notification: true,
      };
      io.to(roomId).emit(SOCKETS_EVENT.UPDATE_MESSAGE, message);

      socket.removeAllListeners();
      socket.leave(socket.id);
    });

    /**
     * refactoring starts here
     */
    // when user join room
    socket.on('join room', (roomId: string) => {
      if (users[roomId]) {
        const length = users[roomId].length;

        if (length === 4) {
          socket.emit('room full');
          return;
        }

        users[roomId].push(socket.id);
      } else {
        users[roomId] = [socket.id];
      }

      socketToRoom[socket.id] = roomId;

      const usersInThisRoom = users[roomId].filter((id) => id !== socket.id); // return all the users except who's emitting event

      socket.emit('all users', usersInThisRoom);
    });

    // sending signal to every people in room
    socket.on('sending signal', (payload: SendSignalPayload) => {
      const { userToSignal, callerId, signal } = payload;

      io.to(userToSignal).emit('user joined', { signal, callerId }); // callerId = person who joined
    });

    socket.on('returning signal', (payload: ReturningSignalPayload) => {
      io.to(payload.callerId).emit('receiving returned signal', { signal: payload.signal, id: socket.id }); // id = id of ther user who is the person who recently joined or me
    });

    socket.on('disconnect', () => {
      const roomId = socketToRoom[socket.id];
      let room = users[roomId];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomId] = room;
      }
    });
  });
};
