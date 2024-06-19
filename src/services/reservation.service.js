import { HttpError } from '../errors/http.error.js';

class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  // 예약 생성 서비스 함수
  async createReservationService(userId, petsitterId, reservationDate, reservationStatus) {
    // 펫시터가 존재하는지 확인
    const petsitter = await this.reservationRepository.findPetsitterById(petsitterId);
    if (!petsitter) {
      throw new HttpError.NotFound('해당 펫시터는 존재하지 않습니다.');
    }
    // 이미 예약된 날짜인지 확인 중복날짜면 예약이 불가합니당
    const isAlreadyReserved = await this.reservationRepository.AlreadyReserved(
      petsitterId,
      reservationDate
    );
    if (isAlreadyReserved) {
      throw new HttpError.Conflict('해당 날짜는 예약이 불가한 날짜입니다.');
    }
    // 예약상태가 존재하면 예약이 불가합니다.
    const unacceptableStatus = await this.reservationRepository.UnacceptableStatus(
      petsitterId,
      reservationDate,
      reservationStatus
    );
    if (unacceptableStatus) {
      console.log(unacceptableStatus);
      throw new HttpError.Conflict('이미예약있어요.');
    }
    const reservationData = {
      userId,
      petsitterId,
      reservationDate,
    };
    return await this.reservationRepository.createReservation(reservationData);
  }

  // 예약 목록 조회 서비스 함수
  async getReservationService(userId, sort) {
    return await this.reservationRepository.getReservation(userId, sort);
  }

  // 예약 상세 조회 서비스 함수
  async getReservationByIdService(reservationId, userId) {
    return await this.reservationRepository.getReservationById(Number(reservationId), userId);
  }

  // 예약 수정 서비스 함수
  async updateReservationService(reservationId, userId, data) {
    return await this.reservationRepository.updateReservation(Number(reservationId), userId, data);
  }

  // 예약 삭제 서비스 함수
  async deleteReservationService(reservationId, userId) {
    return await this.reservationRepository.deleteReservation(Number(reservationId), userId);
  }
}

export default ReservationService;
