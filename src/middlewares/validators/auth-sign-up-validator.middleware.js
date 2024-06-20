import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../../constants/petsitter-auth.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';

const authSignupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.empty': MESSAGES.AUTH.COMMON.EMAIL.STRING,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
    'string.empty': MESSAGES.AUTH.COMMON.PASSWORD.STRING,
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN,
  }),
  passwordCheck: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQUIRED,
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD,
  }),
  nickname: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQUIRED,
    'string.empty': MESSAGES.AUTH.COMMON.NAME.STRING,
  }),
});

export const authSignUpValidator = async (req, res, next) => {
  try {
    await authSignupSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
