import http from 'http';
import { Server, Socket } from 'socket.io';
import Container from 'typedi';
import { SOCKETS_EVENT } from '../../common/constants/socketEvents';
import { CreateRoomInput } from './dtos/creat-room.dto';
import { RoomService } from './room.service';

const socketOptions = {
  cors: {
    origin: '*',
  },
};

export const roomSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, socketOptions);

  const roomServiceInstance = Container.get(RoomService);

  /**
   * connect socket event
   */
  io.on(SOCKETS_EVENT.CONNECT, (socket: Socket) => {
    console.log('✅ Connected to room.', socket.id);

    socket.emit(SOCKETS_EVENT.CONNECT, null);

    /**
     * create new room
     */
    socket.on(SOCKETS_EVENT.CREATE_ROOM, async (createRoomInput: CreateRoomInput) => {
      const room = await roomServiceInstance.createRoom(createRoomInput);
      const roomId = room.id;

      // join socket(user) to that roomId
      socket.join(roomId);

      // tell io server to send this to every server within room
      io.to(roomId).emit(SOCKETS_EVENT.UPDATE_ROOM, room);
    });
  });
};
