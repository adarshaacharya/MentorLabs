export interface CreateNewRoom {
  identity: string;
  roomId: string;
  userId: string;
}

export interface JoinRoom extends CreateNewRoom {}

export interface Room {
  id: string;
  connectedUsers: ConnectedUser[];
}

export interface ConnectedUser {
  id: string;
  identity: string;
  roomId: string;
  socketId: string;
}

export interface ConnUserData {
  connUserSocketId: string;
}

export interface SignalingData {
  connUserSocketId: string;
  signal: unknown;
}

export interface MessageData {
  userId: string;
  name: string;
  text: string;
  roomId: string;
}
