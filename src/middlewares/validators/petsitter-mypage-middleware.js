import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
// 삭제예정

const petsitterMypageSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required':  MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
      }),
  password: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
  }),
});

export const petsitterMypageValidator = async (req, res, next) => {
  try {
    await petsitterMypageSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};