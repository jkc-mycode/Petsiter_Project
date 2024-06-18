import reservationService from '../services/reservation.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
// import { HttpError } from '../errors/http.error.js';

class reservationController {
  // 예약 생성 컨트롤러
  async createReservationController(req, res, next) {
    try {
      //   const user = req.user;   아직 못씀 ㅠ
      const { petsitterId, reservationDate } = req.body;
      const userId = 1; //user.userId;       테스트를 위한 하드코딩

      const data = await reservationService.createReservationService(
        userId,
        petsitterId,
        reservationDate
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESERVATION.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // 예약 목록 조회 컨트롤러
  async getReservationController(req, res, next) {
    try {
      const userId = 1; // 테스트를 위한 하드코딩
      const { sort } = req.query;

      const data = await reservationService.getReservationService(userId, sort);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESERVATION.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  // 예약 상세 조회 컨트롤러
  async getReservationByIdController(req, res, next) {
    try {
      const userId = 1; // 테스트를 위한 하드코딩
      const reservationId = parseInt(req.params.id, 10); // 문자열을 정수로 변환

      const data = await reservationService.getReservationByIdService(reservationId, userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESERVATION.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new reservationController();
