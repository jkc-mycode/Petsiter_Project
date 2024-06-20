import Joi from 'joi';
import { HTTP_STATUS } from '../../constants/http-status.constant.js';
import { RESERVATION_MESSAGES } from '../../constants/reservation.message.constant.js';

const createReservationSchema = Joi.object({
  petsitterId: Joi.number().integer().required().messages({
    'number.base': RESERVATION_MESSAGES.RESERVATION.COMMON.PETSITTER_ID.BASE,
    'any.required': RESERVATION_MESSAGES.RESERVATION.COMMON.PETSITTER_ID.REQUIRED,
  }),
  reservationDate: Joi.date().iso().required().messages({
    'date.base': RESERVATION_MESSAGES.RESERVATION.COMMON.RESERVATION_DATE.BASE,
    'any.required': RESERVATION_MESSAGES.RESERVATION.COMMON.RESERVATION_DATE.REQUIRED,
  }),
  animalType: Joi.string().valid('CAT', 'DOG').required().messages({
    'string.base': RESERVATION_MESSAGES.RESERVATION.COMMON.ANIMAL_TYPE.BASE,
    'any.only': RESERVATION_MESSAGES.RESERVATION.COMMON.ANIMAL_TYPE.ONLY,
    'any.required': RESERVATION_MESSAGES.RESERVATION.COMMON.ANIMAL_TYPE.REQUIRED,
  }),
  hour: Joi.number().integer().required().messages({
    'number.base': RESERVATION_MESSAGES.RESERVATION.COMMON.HOUR.BASE,
    'any.required': RESERVATION_MESSAGES.RESERVATION.COMMON.HOUR.REQUIRED,
  }),
  etc: Joi.string().required().messages({
    'string.base': RESERVATION_MESSAGES.RESERVATION.COMMON.ETC.BASE,
  }),
});

export const createReservationValidator = async (req, res, next) => {
  try {
    await createReservationSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      message: error.details[0].message,
    });
  }
};
