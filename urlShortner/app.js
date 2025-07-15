import express from 'express';
import logRequest from './middlewares/logger.js';
import urlRouter from './routes/url.routes.js';

const app = express();
app.use(express.json());
app.use(logRequest);
app.use('/', urlRouter);

export default app;
