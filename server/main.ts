import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import loaders from './loaders';
import * as http from 'http';
import { roomSocket } from './modules/room/room.socket';
import { Response } from 'express';
import path from 'path';

const PORT = process.env.PORT || 5000;

async function bootstrap(): Promise<void> {
  const app = express.default();
  await loaders(app);

  // Serve static files in prod env
  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')));
    app.get('*', (_, res: Response): void => {
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
  }

  const httpServer = http.createServer(app);

  roomSocket(httpServer);

  const handleListening = () => console.log(`✅  Listening on: http://localhost:${PORT}`);

  httpServer.listen(PORT, handleListening);
}

bootstrap();
