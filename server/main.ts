import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import loaders from './loaders';
import * as http from 'http';
import { roomSocket } from './socket/room.socket';

const PORT = process.env.PORT || 5000;

async function bootstrap(): Promise<void> {
  const app = express.default();
  await loaders(app);

  const httpServer = http.createServer(app);

  roomSocket(httpServer);

  const handleListening = () => console.log(`✅  Listening on: http://localhost:${PORT}`);

  httpServer.listen(PORT, handleListening);
}

bootstrap();
