import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';


const petsitterSignInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required':  MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
      }),
  password: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
  }),
});

export const petsitterSignInValidator = async (req, res, next) => {
  try {
    await petsitterSignInSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};