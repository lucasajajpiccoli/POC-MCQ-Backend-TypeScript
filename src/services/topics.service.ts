import { Topic } from '../protocols.js';
import * as repository from '../repositories/topics.repository.js';

async function createTopicsList(): Promise<Topic[]> {
  const selection = (await repository.list()).rows;
  const topics = selection.map(topic => ({
    id: topic.id,
    name: topic.topic,
    subject: {
      id: topic.subjectId,
      name: topic.subject
    }
  }));
  return topics;
}

export { createTopicsList };