import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import loaders from './loaders';


const PORT = process.env.PORT || 5000;

async function bootstrap(): Promise<void> {
  const app = express.default();
  await loaders(app);

  const handleListening = () => console.log(`✅  Listening on: http://localhost:${PORT}`);
  app.listen(PORT, handleListening);
}

bootstrap();
