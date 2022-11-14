import { QueryResult } from 'pg';
import { connection } from '../database/database.js';
import { QuestionToCreate, Alternative, QuestionToUpdate } from '../protocols.js';

async function insertAlternative(
  alternative: Alternative,
  id: number
): Promise<QueryResult<any>> {
  return connection.query(`
    INSERT INTO alternatives (content, correct, "questionId") VAUES ($1, $2, $3) RETURNING ID;
  `, [alternative.content, alternative.correct, id]
  );
}

async function insertQuestion(question: QuestionToCreate): Promise<QueryResult<any>> {
  return connection.query(`
    INSERT INTO questions (name, stem, "topicId") VALUES ($1, $2, $3) RETURNING ID;
  `, [question.name, question.stem, question.topicId]
  );
}

async function insert(question: QuestionToCreate): Promise<number> {
  const questionInsertion = await insertQuestion(question);
  const { id } = questionInsertion.rows[0];
  question.alternatives.forEach(async alternative =>
    await insertAlternative(alternative, id)
  );
  return questionInsertion.rowCount;
}

async function list(): Promise<QueryResult<any>> {
  return connection.query(`
    SELECT
      questions.id AS id,
      questions.name,
      topics.name AS topic,
      subjects.name AS subject,
      questions.stem,
      alternatives.content,
      alternatives.correct
    FROM alternatives
      JOIN questions ON alternatives."questionId" = questions.id
      JOIN topics ON questions."topicId" = topics.id
      JOIN subjects ON topics."subjectId" = subjects.id;
  `);
}

async function listByTopic(topicId: number): Promise<QueryResult<any>> {
  return connection.query(`
    SELECT
      questions.id AS id,
      questions.name,
      topics.name AS topic,
      subjects.name AS subject,
      questions.stem,
      alternatives.content,
      alternatives.correct
    FROM alternatives
      JOIN questions ON alternatives."questionId" = questions.id
      JOIN topics ON questions."topicId" = topics.id
      JOIN subjects ON topics."subjectId" = subjects.id
    WHERE topics.id = $1;
  `, [topicId]);
}

async function update(question: QuestionToUpdate): Promise<QueryResult<any>> {
  return connection.query(`
    UPDATE questions SET name = $1, stem = $2, "topicId" = $3 WHERE id = $4;
  `, [question.name, question.stem, question.topicId, question.id]
  );
}

async function removeAlternatives(id: number): Promise<QueryResult<any>> {
  return connection.query(`
    DELETE FROM alternatives WHERE "questionId" = $1;
  `, [id]
  );
}

async function removeQuestion(id: number): Promise<QueryResult<any>> {
  return connection.query(`
    DELETE FROM questions WHERE id = $1
  `, [id]
  );
}

async function remove(id: number): Promise<number> {
  await removeAlternatives(id);
  const remotion = await removeQuestion(id);
  return remotion.rowCount;
}

export {
  insert,
  list,
  listByTopic,
  update,
  remove
};