import Joi from 'joi';
import { ADMIN } from '../../constants/admin.message.constant.js';
import { ADMIN_CONSTANT } from '../../constants/admin.update.constant.js';

const adminUpdateSchema = Joi.object({
  title: Joi.string().messages({
    'string.base': ADMIN.COMMON.TITLE.BASE,
  }),
  question: Joi.string().messages({
    'string.base': ADMIN.COMMON.QUESTION.BASE,
  }),
  answer: Joi.string().messages({
    'string.base': ADMIN.COMMON.ANSWER.BASE,
  }),
  qnaStatus: Joi.string()
    .valid(...Object.values(ADMIN_CONSTANT.QNA_STATUS))
    .messages({
      'string.base': ADMIN.COMMON.ANSWER.BASE,
      'any.only': ADMIN.COMMON.QNASTATUS.ONLY,
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
