import http from 'http';
import { Server, Socket } from 'socket.io';
import { socketEvents } from '../../common/constants/socketEvents';
import { ConnUserData, CreateNewRoom, JoinRoom, MessageData, SignalingData } from './dtos/socket.dto';
import * as socketHandler from './room.handler';

const socketOptions = {
  cors: {
    origin: '*',
  },
};

export const roomSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, socketOptions);

  io.on(socketEvents.CONNECT, (socket: Socket) => {
    console.log('✅ user connected to room.', socket.id);

    socket.on(socketEvents.CREATE_NEW_ROOM, (data: CreateNewRoom) => {
      socketHandler.createNewRoom(socket, data);
    });

    socket.on(socketEvents.JOIN_ROOM, (data: JoinRoom) => {
      socketHandler.joinRoom(io, socket, data);
    });

    socket.on(socketEvents.CONN_SIGNAL, (data: SignalingData) => {
      socketHandler.signalingHandler(io, socket, data);
    });

    socket.on(socketEvents.CONN_INIT, (data: ConnUserData) => {
      socketHandler.initializeConnectionHandler(io, socket, data);
    });

    // disconnect is listened automatically once user left room
    socket.on(socketEvents.DISCONNECT, () => {
      socketHandler.disconnect(io, socket);
    });

    // send message
    socket.on(socketEvents.UPDATE_MESSAGE, (messageData: MessageData) => {
      socketHandler.sendMessage(io, messageData);
    });
  });
};
