import { QuestionToRead } from '../protocols.js';
import * as repository from '../repositories/questions.repository.js';

function createQuestionsList(selection: any[]): QuestionToRead[] {
  const ids = Array.from(new Set(selection.map(alternative => alternative.id)));
  const questions = ids.map(id => {
    const { name, topic, subject, stem } = selection.find(alternative => alternative.id === id);
    const alternatives = selection
      .filter(alternative => alternative.id === id)
      .map(alternative => ({
        content: alternative.content,
        correct: alternative.correct
      }));
    return {
      id,
      name,
      topic,
      subject,
      stem,
      alternatives
    };
  });
  return questions;
}

async function list(): Promise<QuestionToRead[]> {
  const selection = (await repository.list()).rows;
  const questions = createQuestionsList(selection);
  return questions;
}

async function listByTopic(topicId: number): Promise<QuestionToRead[]> {
  const selection = (await repository.listByTopic(topicId)).rows;
  const questions = createQuestionsList(selection);
  return questions;
}

export {
  list,
  listByTopic
}