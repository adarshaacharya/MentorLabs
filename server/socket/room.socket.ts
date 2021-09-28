import { Server } from 'socket.io';
import http from 'http';
import { SOCKETS_EVENT } from '../common/constants/sockets';

const socketOptions = {
  cors: {
    origin: '*',
  },
};

export const roomSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, socketOptions);

  io.on(SOCKETS_EVENT.CONNECT, () => {
    console.log('Connected to socket');
  });
};
