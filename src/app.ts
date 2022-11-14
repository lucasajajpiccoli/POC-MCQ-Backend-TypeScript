import express from 'express';
import { questionsRouter } from './routers/questions.router.js';
import { topicsRouter } from './routers/topics.router.js';

const app = express();
app.use(express.json());

app.use(questionsRouter);
app.use(topicsRouter);

export { app };