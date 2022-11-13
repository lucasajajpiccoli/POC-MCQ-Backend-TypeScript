export type Subject = {
  id: number,
  name: string
};

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
  topic: Topic,
  alternatives: Alternative[]
};

export type QuestionToUpdate = {
  id: number,
  name: string,
  stem: string,
  topicId: number
};

