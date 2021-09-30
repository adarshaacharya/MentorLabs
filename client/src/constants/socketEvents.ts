const SOCKET_EVENT = `socket.event`;

export const SOCKETS_EVENT = {
  CONNECT: `connect`,
  DISCONNECT: `${SOCKET_EVENT}.disconnect`,

  CREATE_ROOM: `${SOCKET_EVENT}.create.room`,
  JOIN_ROOM: `${SOCKET_EVENT}.join.room`,
  UPDATE_ROOM: `${SOCKET_EVENT}.update.room`, // @todo : update room title
};
