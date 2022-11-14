import { Request, Response} from 'express';
import * as service from '../services/topics.service.js';

async function list(req: Request, res: Response) {
  try {
    const topics = await service.createTopicsList();
    return res.status(200).send(topics);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { list };