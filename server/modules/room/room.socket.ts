import http from 'http';
import { Server, Socket } from 'socket.io';
import { SOCKETS_EVENT } from '../../common/constants/socketEvents';
import { SocketMessage } from './dtos/socket.dto';

const socketOptions = {
  cors: {
    origin: '*',
  },
};

export const roomSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, socketOptions);

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
  });
};
