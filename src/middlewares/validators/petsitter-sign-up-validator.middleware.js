import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../../constants/petsitter-auth.constant.js'

const petsitterSignupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '이메일을 입력해 주세요',
    'string.email': '이메일 형식이 올바르지 않습니다.',
  }),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    'any.required': '비밀번호를 입력해 주세요',
    'string.min': '비밀번호는 5자리 이상이어야 합니다.',
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': '비밀번호 확인이 필요합니다.',
    'any.only': '비밀번호가 일치하지 않습니다.',
  }),
  petsitterName: Joi.string().required().messages({
    'any.required': '이름을 입력해 주세요.',
  }),
  petsitterCareer: Joi.number().required().messages({
    'any.required': '경력을 입력해 주세요.',
  }),
  petsitterProfileImage: Joi.string().required().messages({
    'any.required': '프로필 사진을 입력해 주세요.',
  }),
  title:Joi.string().required().messages({
    'any.required': '제목을 입력해 주세요.',
  }),
  content:Joi.string().required().messages({
    'any.required': '내용을 입력해 주세요.',
  }),
  region:Joi.string().required().messages({
    'any.required': '지역을 입력해 주세요.',
  }),
  price:Joi.number().required().messages({
    'any.required': '가격을 입력해 주세요.',
  }),
  totalRate:Joi.number().required().messages({
    'any.required': '평점을 입력해 주세요.',
  })
});

export const petsitterSignUpValidator = async (req, res, next) => {
  try {
    await petsitterSignupSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};