export type Topic = {
  id: number,
  name: string,
  subject: {
    id: number,
    name: string
  }
};

export type Alternative = {
  id?: number,
  content: string,
  correct: boolean
};

export type QuestionToCreate = {
  name: string,
  stem: string,
  topicId: number,
  alternatives: Alternative[]
};

export type QuestionToRead = {
  id: number,
  name: string,
  stem: string,
  topic: string,
  subject: string,
  alternatives: Alternative[]
};

export type QuestionToUpdate = {
  id: number,
  name: string,
  stem: string,
  topicId: number
};

export type QuestionFromDatabase = {
  id: number,
  name: string,
  topic: string,
  subject: string,
  stem: string,
  content: string,
  correct: boolean
};
