import Joi from 'joi';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { RESERVATION_MESSAGES } from '../../constants/reservation.message.constant.js';

const updateReservationSchema = Joi.object({
  reservationDate: Joi.date().iso().optional().messages({
    'date.base': RESERVATION_MESSAGES.RESERVATION.COMMON.RESERVATION_DATE.BASE,
  }),
  animalType: Joi.string().valid('CAT', 'DOG').optional().messages({
    'string.base': RESERVATION_MESSAGES.RESERVATION.COMMON.ANIMAL_TYPE.BASE,
    'any.only': RESERVATION_MESSAGES.RESERVATION.COMMON.ANIMAL_TYPE.ONLY,
  }),
  hour: Joi.number().integer().optional().messages({
    'number.base': RESERVATION_MESSAGES.RESERVATION.COMMON.HOUR.BASE,
  }),
  etc: Joi.string().optional().messages({
    'string.base': RESERVATION_MESSAGES.RESERVATION.COMMON.ETC.BASE,
  }),
});

export const updateReservationValidator = async (req, res, next) => {
  try {
    await updateReservationSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      message: error.details[0].message,
    });
  }
};
