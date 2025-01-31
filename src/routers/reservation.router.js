import express from 'express';
import ReservationController from '../controllers/reservation.controller.js';
import accesstokenmiddleware from '../middlewares/auth-access-token.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import ReservationRepository from '../repositories/reservation.repository.js';
import ReservationService from '../services/reservation.service.js';
import { createReservationValidator } from '../middlewares/validators/reservation-create-validator.middleware.js';
import { updateReservationValidator } from '../middlewares/validators/reservation-update-validator.middleware.js';

const reservationRouter = express.Router();
const reservationRepository = new ReservationRepository(prisma);
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

// 예약 생성
reservationRouter.post(
  '/',
  accesstokenmiddleware,
  createReservationValidator,
  reservationController.createReservation
);

// 예약 목록 조회
reservationRouter.get('/', accesstokenmiddleware, reservationController.getReservation);

// 예약 상세 조회
reservationRouter.get(
  '/:reservationId',
  accesstokenmiddleware,
  reservationController.getReservationById
);

// 예약 수정
reservationRouter.put(
  '/:reservationId',
  accesstokenmiddleware,
  updateReservationValidator,
  reservationController.updateReservation
);

// 예약 삭제
reservationRouter.delete(
  '/:reservationId',
  accesstokenmiddleware,
  reservationController.deleteReservation
);

export default reservationRouter;
