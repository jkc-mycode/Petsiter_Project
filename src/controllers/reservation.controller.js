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
}
export default new reservationController();
