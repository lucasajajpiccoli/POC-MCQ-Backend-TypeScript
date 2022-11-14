import Joi from 'joi';

const QuestionToCreateSchema = Joi.object({
  name: Joi.string().max(255).required(),
  stem: Joi.string().required(),
  topicId: Joi.number().integer().required(),
  alternatives: Joi.array().items(
    Joi.object({
      content: Joi.string().required(),
      correct: Joi.boolean().valid(true).required()
    }).required(),
    Joi.object({
      content: Joi.string().required(),
      correct: Joi.boolean().valid(false).required()
    }).required(),
    Joi.object({
      content: Joi.string().required(),
      correct: Joi.boolean().valid(false).required()
    })
  ).required()
});

const QuestionToUpdateSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().max(255).required(),
  stem: Joi.string().required(),
  topicId: Joi.number().integer().required()
});

export {
  QuestionToCreateSchema,
  QuestionToUpdateSchema
};