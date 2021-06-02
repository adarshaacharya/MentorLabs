import * as dotenv from 'dotenv';
import app from './app';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const hostname = 'localhost';
const PORT = process.env.PORT || 5000;

const handleListening = () => console.log(`✅  Listening on: http://${hostname}:${PORT}`);

app.listen(handleListening);
