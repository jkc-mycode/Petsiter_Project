import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../../constants/petsitter-auth.constant.js';
import { MAX_RATE_LENGTH } from '../../constants/petsitter-auth.constant.js';
import { MESSAGES } from '../../constants/message.constant.js';
import { PETSITTERMESSAGES } from '../../constants/petsitter.auth.message.constant.js';

const petsitterSignupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN,
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQUIRED,
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD,
  }),
  petsitterName: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQUIRED,
  }),
  petsitterCareer: Joi.number().integer().required().messages({
    'any.required': PETSITTERMESSAGES.PETSITTER.COMMON.CAREER.REQUIRED,
  }),
  title: Joi.string().required().messages({
    'any.required': PETSITTERMESSAGES.PETSITTER.COMMON.TITLE.REQUIRED,
  }),
  content: Joi.string().required().messages({
    'any.required': PETSITTERMESSAGES.PETSITTER.COMMON.CONTENT.REQUIRED,
  }),
  region: Joi.string().required().messages({
    'any.required': PETSITTERMESSAGES.PETSITTER.COMMON.REGION.REQUIRED,
  }),
  price: Joi.number().integer().required().messages({
    'any.required': PETSITTERMESSAGES.PETSITTER.COMMON.PRICE.REQUIRED,
    'number.base': PETSITTERMESSAGES.PETSITTER.COMMON.PRICE.BASE,
  }),
  totalRate: Joi.number().integer().required().max(MAX_RATE_LENGTH).messages({
    'any.required': PETSITTERMESSAGES.PETSITTER.COMMON.RATE.REQUIRED,
    'number.base': PETSITTERMESSAGES.PETSITTER.COMMON.RATE.BASE,
    'number.max': PETSITTERMESSAGES.PETSITTER.COMMON.RATE.MAX,
  }),
});

export const petsitterSignUpValidator = async (req, res, next) => {
  try {
    await petsitterSignupSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
