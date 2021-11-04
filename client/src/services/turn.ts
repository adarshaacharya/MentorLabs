import * as api from './api';

let TURNIceServers: string[] = null;

export const fetchTURNCredentials = async () => {
  const response = await api.getTURNCredentials();

  if (response.token?.iceServers) {
    TURNIceServers = response.token.iceServers;
  }

  return TURNIceServers;
};

export const getTURNIceServers = () => {
  return TURNIceServers;
};
