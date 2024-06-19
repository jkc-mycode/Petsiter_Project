import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService; // 인스턴스화
  }
  // 예약 생성
  createReservation = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ errorMessage: '사용자 정보가 없습니다.' });
      }

      const { petsitterId, reservationDate, animalType, hour, etc } = req.body;
      const userId = req.user.userId; // 미들웨어에서 설정된 사용자 ID
      const data = await this.reservationService.createReservationService(
        userId,
        petsitterId,
        reservationDate,
        animalType,
        hour,
        etc
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESERVATION.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 나의 예약 목록 조회 컨트롤러
  getReservation = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ errorMessage: '사용자 정보가 없습니다.' });
      }

      const userId = req.user.userId; // 미들웨어에서 설정된 사용자 ID
      const { sort } = req.query;

      const data = await this.reservationService.getReservationService(userId, sort);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESERVATION.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 예약 상세 조회 컨트롤러
  getReservationById = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ errorMessage: '사용자 정보가 없습니다.' });
      }

      const userId = req.user.userId;
      const reservationId = Number(req.params.reservationId);

      const data = await this.reservationService.getReservationByIdService(reservationId, userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESERVATION.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 예약 수정 컨트롤러
  updateReservation = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ errorMessage: '사용자 정보가 없습니다.' });
      }

      const userId = req.user.userId;
      const reservationId = Number(req.params.reservationId);
      const data = req.body;

      const updatedReservation = await this.reservationService.updateReservationService(
        reservationId,
        userId,
        data
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESERVATION.UPDATE.SUCCEED,
        data: updatedReservation,
      });
    } catch (error) {
      next(error);
    }
  };

  // 예약 삭제 컨트롤러
  deleteReservation = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ errorMessage: '사용자 정보가 없습니다.' });
      }

      const userId = req.user.userId;
      const reservationId = Number(req.params.reservationId);

      const deletedReservation = await this.reservationService.deleteReservationService(
        reservationId,
        userId
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESERVATION.DELETE.SUCCEED,
        data: deletedReservation,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ReservationController;
