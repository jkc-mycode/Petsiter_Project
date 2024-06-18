// import { MESSAGES } from '../constants/message.constant.js';
import reservationRepository from '../repositories/reservation.repository.js';
// import { HttpError } from '../errors/http.error.js';

class reservationService {
  // 예약 생성 서비스 함수
  async createReservationService(userId, petsitterId, reservationDate) {
    // 예약 생성 데이터 준비
    const reservationData = {
      userId,
      petsitterId,
      reservationDate,
    };

    // 데이터베이스에 예약 생성 요청
    const data = await reservationRepository.createReservation(reservationData);

    return data;
  }
}
export default new reservationService();
