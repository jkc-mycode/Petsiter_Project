import Joi from 'joi';
import { PETSITTER_MESSAGE } from '../../constants/petsitter.message.constant.js';
import { PETSITTER_CONSTANT } from '../../constants/petsitter.constant.js';

// 펫시터 예약 상태 변경 유효성 검사
export const petsitterReservationStatusUpdateValidator = async (req, res, next) => {
  try {
    const petsitterReservationStatusUpdateSchema = Joi.object({
      reservationId: Joi.number().required().messages({
        'number.base': PETSITTER_MESSAGE.RESERVATION.COMMON.RESERVATION_ID.BASE,
        'any.required': PETSITTER_MESSAGE.RESERVATION.COMMON.RESERVATION_ID.REQUIRED,
      }),
      reservationStatus: Joi.string()
        .valid(...Object.values(PETSITTER_CONSTANT.RESERVATION_STATUS))
        .required()
        .messages({
          'string.base': PETSITTER_MESSAGE.RESERVATION.COMMON.RESERVATION_STATUS.BASE,
          'any.required': PETSITTER_MESSAGE.RESERVATION.COMMON.RESERVATION_STATUS.REQUIRED,
          'any.only': PETSITTER_MESSAGE.RESERVATION.COMMON.RESERVATION_STATUS.ONLY,
        }),
    });
    await petsitterReservationStatusUpdateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
