import cors from 'cors';
import express from 'express';

const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

export default app;
