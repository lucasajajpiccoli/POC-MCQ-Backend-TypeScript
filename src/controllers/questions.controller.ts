import { Request, Response} from 'express';
import { QuestionToCreate, QuestionToUpdate } from '../protocols.js';
import * as service from '../services/questions.service.js';
import * as repository from '../repositories/questions.repository.js';

async function insert(req: Request, res: Response) {
  const question = req.body as QuestionToCreate;
  try {
    const rowCount = await repository.insert(question);
    if(rowCount > 0) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function list(req: Request, res: Response) {
  try {
    const questions = await service.list();
    return res.status(200).send(questions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function listByTopic(req: Request, res: Response) {
  const { topic_id } = res.locals;
  try {
    const questions = await service.listByTopic(topic_id);
    return res.status(200).send(questions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function update(req: Request, res: Response) {
  const question = req.body as QuestionToUpdate;
  try {
    const updation = await repository.update(question);
    if(updation.rowCount > 0) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function remove(req: Request, res: Response) {
  const { question_id } = res.locals;
  try {
    const rowCount = await repository.remove(question_id);
    if(rowCount > 0) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export {
  insert,
  list,
  listByTopic,
  update,
  remove
};