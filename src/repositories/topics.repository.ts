import { QueryResult } from 'pg';
import { connection } from '../database/database.js';

async function list(): Promise<QueryResult> {
  return connection.query(`
    SELECT
      topics.id,
      topics.name AS topic,
      subjects.id AS "subjectId",
      subjects.name AS subject
    FROM topics
      JOIN subjects ON topics."subjectId" = subjects.id;
  `);
}

export { list };