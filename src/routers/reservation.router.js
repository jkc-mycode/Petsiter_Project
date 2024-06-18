import express from 'express';
import reservationController from '../controllers/reservation.controller.js';

const reservationRouter = express.Router();

// 예약 생성
reservationRouter.post('/', reservationController.createReservationController);

// // 예약 목록 조회
// reservationRouter.get('/', reservationController.getreservationsController);

// // 예약 상세 조회
// reservationRouter.get('/:id', reservationController.getreservationController);

// // 예약 수정
// reservationRouter.put('/:id', reservationController.updatereservationController);

// // 예약 삭제
// reservationRouter.delete('/:id', reservationController.deletereservationController);

export default reservationRouter;
