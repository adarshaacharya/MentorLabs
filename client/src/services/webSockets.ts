import { SOCKETS_EVENT } from 'constants/socketEvents';
import { CreateRoomData } from 'types';
import { socket } from 'utils/socketConfig';

/**
 * connect with websocket server
 */
export const connectWithWebSocket = () => {
  socket.on(SOCKETS_EVENT.CONNECT, () => {
    console.log('succesfully connected with wss server');
    console.log(socket.id);
  });
};

/**
 * create new room
 */
export const createRoom = (roomData: CreateRoomData) => {
  try {
    socket.emit(SOCKETS_EVENT.CREATE_ROOM, roomData);

    socket.on(SOCKETS_EVENT.UPDATE_ROOM, (room: any) => {
      console.log(room);
    });
  } catch (error) {
    console.log(error);
  }
};
