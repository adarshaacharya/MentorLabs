import http from 'http';
import { Server, Socket } from 'socket.io';
import { SOCKETS_EVENT } from '../../common/constants/socketEvents';
import { ConnUserData, CreateNewRoom, JoinRoom, SignalingData, SocketMessage } from './dtos/socket.dto';
import * as socketHandler from './room.handler';

const socketOptions = {
  cors: {
    origin: '*',
  },
};

export const roomSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, socketOptions);

  io.on(SOCKETS_EVENT.CONNECT, (socket: Socket) => {
    console.log('✅ user connected to room.', socket.id);

    socket.on('create-new-room', (data: CreateNewRoom) => {
      socketHandler.createNewRoom(socket, data);
    });

    socket.on('join-room', (data: JoinRoom) => {
      socketHandler.joinRoom(io, socket, data);
    });

    socket.on('conn-signal', (data: SignalingData) => {
      socketHandler.signalingHandler(io, socket, data);
    });

    socket.on('conn-init', (data: ConnUserData) => {
      socketHandler.initializeConnectionHandler(io, socket, data);
    });

    // disconnect is listened automatically once user left room
    socket.on('disconnect', () => {
      socketHandler.disconnect(io, socket);
    });

    // send message
    socket.on(SOCKETS_EVENT.SEND_MESSAGE, (messageData: SocketMessage, callback) => {
      socketHandler.sendMessage(io, messageData, callback);
    });
  });
};
