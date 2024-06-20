import Joi from 'joi';
import { PETSITTER_MESSAGE } from '../../constants/petsitter.message.constant.js';

// 펫시터 자격증 수정 유효성 검사
export const petsitterCertificateUpdateValidator = async (req, res, next) => {
  try {
    const petsitterCertificateUpdateSchema = Joi.object({
      certificateName: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_NAME.BASE,
      }),
      certificateIssuer: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_ISSUER.BASE,
      }),
      certificateDate: Joi.string().messages({
        'string.base': PETSITTER_MESSAGE.CERTIFICATE.COMMON.CERTIFICATE_DATE.BASE,
      }),
    });

    await petsitterCertificateUpdateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
