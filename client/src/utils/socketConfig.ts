import config from 'config';
import { PRODUCTION } from 'constants/env';
import io from 'socket.io-client';

const ENDPOINT = config.env === PRODUCTION ? 'https://mentorlabs.herokuapp.com' : 'http://localhost:5000';

export const socket = io(ENDPOINT);
