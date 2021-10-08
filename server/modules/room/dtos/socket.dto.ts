export interface SocketMessage {
  roomId: string;
  text: string;
}

export interface CreateNewRoom {
  identity: string;
  roomId: string;
  userId: string;
}

export interface JoinRoom extends CreateNewRoom {}

export interface ConnectedUser {
  id: string;
  identity: string;
  roomId: string;
  socketId: string;
}

export interface CreateRoom {
  id: string;
  connectedUsers: ConnectedUser[];
}
