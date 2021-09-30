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
      try {
        const room = await roomServiceInstance.createRoom(createRoomInput);
        const roomId = room.id;

        // join socket(user) to that roomId
        socket.join(roomId);

        // send info about room to
        io.to(roomId).emit(SOCKETS_EVENT.UPDATE_ROOM, room); // @todo : ser some other name
      } catch (error) {
        console.log('Error in creating room', error);
      }
    });

    /**
     * join existing room
     */
    socket.on(SOCKETS_EVENT.JOIN_ROOM, async (roomId: string, callback: ({ error }: { error: string }) => void) => {
      try {
        const room = await roomServiceInstance.findRoomById(roomId);

        if (!room) {
          return callback({ error: "Room with given id deson't exists" });
        }

        socket.join(roomId); // join socket(user) to that room

        io.to(roomId).emit(SOCKETS_EVENT.UPDATE_ROOM, room); // send room info to roomId after joining
      } catch (error) {
        console.log('Error in joining room', error);
        return callback({ error: 'Error in joining room' });
      }
    });
  });
};
