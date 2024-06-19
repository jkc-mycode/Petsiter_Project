import Joi from 'joi';
import { PETSITTER_MESSAGE } from '../../constants/petsitter.message.constant.js';

// 펫시터 수정 유효성 검사
export const petsitterUpdateValidator = async (req, res, next) => {
  try {
    const petsitterUpdateSchema = Joi.object({
      petsitterName: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.PETSITTER.COMMON.PETSITTER_NAME.BASE,
      }),
      petsitterCareer: Joi.number().messages({
        'number.base': PETSITTER_MESSAGE.PETSITTER.COMMON.PETSITTER_CAREER.BASE,
      }),
      petsitterProfileImage: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.PETSITTER.COMMON.PETSITTER_PROFILE_IMAGE.BASE,
      }),
      title: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.PETSITTER.COMMON.TITLE.BASE,
      }),
      content: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.PETSITTER.COMMON.CONTENT.BASE,
      }),
      region: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.PETSITTER.COMMON.REGION.BASE,
      }),
      price: Joi.number().messages({
        'number.base': PETSITTER_MESSAGE.PETSITTER.COMMON.PRICE.BASE,
      }),
    });
    await petsitterUpdateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
