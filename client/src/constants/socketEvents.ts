const SOCKET_EVENT = `socket.event`;

export const SOCKETS_EVENT = {
  CONNECT: `connect`,
  DISCONNECT: `${SOCKET_EVENT}.disconnect`,

  CREATE_ROOM: `${SOCKET_EVENT}.create.room`,
  CREATED_ROOM: `${SOCKET_EVENT}.user.created.room`,

  JOIN_ROOM: `${SOCKET_EVENT}.join.room`,
  JOINED_ROOM: `${SOCKET_EVENT}.user.joined.room`,

  END_CALL: `${SOCKET_EVENT}.end.call`,

  SEND_MESSAGE: `${SOCKET_EVENT}.send.message`,
  UPDATE_MESSAGE: `${SOCKET_EVENT}.update.message`,
};
