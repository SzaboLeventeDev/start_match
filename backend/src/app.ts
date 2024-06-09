import express from 'express';
import cors from 'cors';
import { api } from './routes';
import errorHandler from './middleware/errorHandler';
import config from './config';

const app = express();

app.options('*', cors(config.corsOptions)); // Preflight OPTIONS kérések kezelése
app.use(cors(config.corsOptions)); // Közvetlenül beállított CORS middleware

app.use(express.json());
app.use(api);

app.use(errorHandler);

export default app;
