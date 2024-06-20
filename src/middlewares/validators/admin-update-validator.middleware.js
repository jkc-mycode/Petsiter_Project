import Joi from 'joi';
import { ADMIN } from '../../constants/admin.message.constant.js';

const adminUpdateSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': ADMIN.COMMON.TITLE.REQUIRED,
    'string.base': ADMIN.COMMON.TITLE.BASE,
  }),
  question: Joi.string().required().messages({
    'any.required': ADMIN.COMMON.QUESTION.REQUIRED,
    'string.base': ADMIN.COMMON.QUESTION.BASE,
  }),
  answer: Joi.string().required().messages({
    'string.base': ADMIN.COMMON.ANSWER.BASE,
    'any.required': ADMIN.COMMON.ANSWER.REQUIRED,
  }),
});

export const adminUpdateValidator = async (req, res, next) => {
  try {
    await adminUpdateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
