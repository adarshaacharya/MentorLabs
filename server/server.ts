import * as dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();

import app from './loaders/app';
import { dbConnection } from './loaders/database';

const hostname = 'localhost';
const PORT = process.env.PORT || 5000;

async function bootstrap(): Promise<void> {
  await dbConnection();
  const handleListening = () => console.log(`✅  Listening on: http://${hostname}:${PORT}`);
  app.listen(PORT, handleListening);
}

bootstrap();
