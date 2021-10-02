const SOCKET_EVENT = `socket.event`;

export const SOCKETS_EVENT = {
  CONNECT: `connection`,
  DISCONNECT: `${SOCKET_EVENT}.disconnect`, // not used

  CREATE_ROOM: `${SOCKET_EVENT}.create.room`,
  CREATED_ROOM: `${SOCKET_EVENT}.user.created.room`,

  JOIN_ROOM: `${SOCKET_EVENT}.join.room`,
  JOINED_ROOM: `${SOCKET_EVENT}.user.joined.room`,

  LEAVE_ROOM: `${SOCKET_EVENT}.leave.call`, // not used

  SEND_MESSAGE: `${SOCKET_EVENT}.send.message`,
  UPDATE_MESSAGE: `${SOCKET_EVENT}.update.message`,

  SEND_LOCAL_STREAM: `${SOCKET_EVENT}.send.local.stream`, //
  FORWARD_LOCAL_STREAM: `${SOCKET_EVENT}.forward.local.stream`, //

  SEND_REMOTE_STREAM: `${SOCKET_EVENT}.send.remote.stream`, //
  FORWARD_REMOTE_STREAM: `${SOCKET_EVENT}.received.remote.stream`, //

  SEND_SIGNAL: `${SOCKET_EVENT}.send.signal`,
  RECEIVE_SIGNAL: `${SOCKET_EVENT}.receive.signal`,
};
