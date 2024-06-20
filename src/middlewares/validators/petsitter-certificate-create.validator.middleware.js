import Joi from 'joi';
import { PETSITTER_MESSAGE } from '../../constants/petsitter.message.constant.js';

// 펫시터 자격증 생성 유효성 검사
export const petsitterCertificateCreateValidator = async (req, res, next) => {
  try {
    const petsitterCertificateCreateSchema = Joi.object({
      certificateName: Joi.string().required().messages({
        'string.base': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_NAME.BASE,
        'string.empty': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_NAME.REQUIRED,
        'any.required': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_NAME.REQUIRED,
      }),
      certificateIssuer: Joi.string().required().messages({
        'string.base': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_ISSUER.BASE,
        'string.empty': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_ISSUER.REQUIRED,
        'any.required': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_ISSUER.REQUIRED,
      }),
      certificateDate: Joi.string().required().messages({
        'string.base': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_DATE.BASE,
        'string.empty': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_DATE.REQUIRED,
        'any.required': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_DATE.REQUIRED,
      }),
    });

    await petsitterCertificateCreateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
