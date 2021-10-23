import io from 'socket.io-client';

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://mentorlabs.herokuapp.com' : 'http://localhost:5000';

export const socket = io(ENDPOINT);
