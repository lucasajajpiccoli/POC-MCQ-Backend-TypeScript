import { Request, Response, NextFunction } from 'express';
import {
  QuestionToCreateSchema,
  QuestionToUpdateSchema
} from 'src/schemas/questions.schema.js';

function TopicIdMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const topic_id = Number(req.params.topic_id);
  if(isNaN(topic_id) || topic_id % 1 !== 0) {
    res.sendStatus(422);
  } else {
    res.locals.topic_id = topic_id;
    next();
  }
}

function QuestionIdMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const question_id = Number(req.params.question_id);
  if(isNaN(question_id) || question_id % 1 !== 0) {
    res.sendStatus(422);
  } else {
    res.locals.question_id = question_id;
    next();
  }
}

function QuestionToCreateMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { error } = QuestionToCreateSchema.validate(req.body, { abortEarly: false });
  if(error) {
    const errors: string[] = error.details.map(detail => detail.message);
    res.status(422).send(errors);
  } else {
    next();
  }
}

function QuestionToUpdateMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { error } = QuestionToUpdateSchema.validate(req.body, { abortEarly: false });
  if(error) {
    const errors: string[] = error.details.map(detail => detail.message);
    res.status(422).send(errors);
  } else {
    next();
  }
}

export {
    QuestionToCreateMiddleware,
    QuestionToUpdateMiddleware,
    TopicIdMiddleware,
    QuestionIdMiddleware
};