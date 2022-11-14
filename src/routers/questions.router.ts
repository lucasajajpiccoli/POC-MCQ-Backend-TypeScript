import { Router } from 'express';
import {
  QuestionToCreateMiddleware,
  QuestionToUpdateMiddleware,
  TopicIdMiddleware,
  QuestionIdMiddleware
} from '../middlewares/questions.middleware.js';
import {
  insert,
  list,
  listByTopic,
  update,
  remove
} from '../controllers/questions.controller.js';

const questionsRouter = Router();

questionsRouter.post('/questions', QuestionToCreateMiddleware, insert);
questionsRouter.get('/questions', list);
questionsRouter.get('/questions/topic/:topic_id', TopicIdMiddleware, listByTopic);
questionsRouter.put('/questions/', QuestionToUpdateMiddleware, update);
questionsRouter.delete('/questions/id/:question_id', QuestionIdMiddleware, remove);

export { questionsRouter };