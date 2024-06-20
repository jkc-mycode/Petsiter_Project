import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

const authSignInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.empty': MESSAGES.AUTH.COMMON.EMAIL.STRING,
  }),
  password: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
    'string.empty': MESSAGES.AUTH.COMMON.PASSWORD.STRING,
  }),
});

export const authSignInValidator = async (req, res, next) => {
  try {
    await authSignInSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
