import { Router } from 'express';
import { list } from '../controllers/topics.controller.js';

const topicsRouter = Router();

topicsRouter.get('/topics', list);

export { topicsRouter };