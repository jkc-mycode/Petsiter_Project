import express from 'express';
import reservationController from '../controllers/reservation.controller.js';

const reservationRouter = express.Router();

// 예약 생성
reservationRouter.post('/', reservationController.createReservationController);

// 예약 목록 조회
reservationRouter.get('/', reservationController.getReservationController);

// 예약 상세 조회
reservationRouter.get('/:reservationId', reservationController.getReservationByIdController);

// 예약 수정
reservationRouter.put('/:reservationId', reservationController.updateReservationController);

// // 예약 삭제
// reservationRouter.delete('/:reservationId', reservationController.deletereservationController);

export default reservationRouter;
