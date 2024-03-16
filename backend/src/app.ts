import express from 'express';
import { api } from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(api)

app.use(errorHandler)

export default app;
