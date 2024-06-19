class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  // 예약 생성 서비스 함수
  async createReservationService(userId, petsitterId, reservationDate) {
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
