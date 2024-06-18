import Joi from 'joi';


const petsitterMypageSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': '이메일을 입력해 주세요',
      }),
  password: Joi.string().required().messages({
    'any.required': '비밀번호를 입력해 주세요',
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