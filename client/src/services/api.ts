import config from 'config';
import http from 'utils/http';

type Token = {
  iceServers: string[];
};
export const getTURNCredentials = async () => {
  const endpoint = config.endpoints.room.getTURNCredentials;

  const response = await http.get<{ token: Token | null }>(endpoint);

  return response.data;
};
