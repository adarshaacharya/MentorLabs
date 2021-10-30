import http from 'http';
import { Server, Socket } from 'socket.io';
import { SOCKETS_EVENT } from '../../common/constants/socketEvents';
import { ConnUserData, CreateNewRoom, JoinRoom, MessageData, SignalingData } from './dtos/socket.dto';
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

    socket.on(SOCKETS_EVENT.CREATE_NEW_ROOM, (data: CreateNewRoom) => {
      socketHandler.createNewRoom(socket, data);
    });

    socket.on(SOCKETS_EVENT.JOIN_ROOM, (data: JoinRoom) => {
      socketHandler.joinRoom(io, socket, data);
    });

    socket.on(SOCKETS_EVENT.CONN_SIGNAL, (data: SignalingData) => {
      socketHandler.signalingHandler(io, socket, data);
    });

    socket.on(SOCKETS_EVENT.CONN_INIT, (data: ConnUserData) => {
      socketHandler.initializeConnectionHandler(io, socket, data);
    });

    // disconnect is listened automatically once user left room
    socket.on(SOCKETS_EVENT.DISCONNECT, () => {
      socketHandler.disconnect(io, socket);
    });

    // send message
    socket.on(SOCKETS_EVENT.UPDATE_MESSAGE, (messageData: MessageData) => {
      socketHandler.sendMessage(io, messageData);
    });
  });
};
