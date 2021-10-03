const SOCKET_EVENT = `socket.event`;

export const SOCKETS_EVENT = {
  CONNECT: `connect`,
  DISCONNECT: `${SOCKET_EVENT}.disconnect`, // not used

  CREATE_ROOM: `${SOCKET_EVENT}.create.room`,
  CREATED_ROOM: `${SOCKET_EVENT}.user.created.room`,

  JOIN_ROOM: `${SOCKET_EVENT}.join.room`,
  JOINED_ROOM: `${SOCKET_EVENT}.user.joined.room`,

  LEAVE_ROOM: `${SOCKET_EVENT}.leave.room`,

  SEND_MESSAGE: `${SOCKET_EVENT}.send.message`,
  UPDATE_MESSAGE: `${SOCKET_EVENT}.update.message`,

  SEND_SIGNAL: `${SOCKET_EVENT}.send.signal`,
  RECEIVE_SIGNAL: `${SOCKET_EVENT}.receive.signal`,
};
