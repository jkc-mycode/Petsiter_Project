import { HttpError } from '../errors/http.error.js';

class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  // 예약 생성 서비스 함수
  async createReservationService(userId, petsitterId, reservationDate, animalType, hour, etc) {
    // 예약상태가 ACCEPT면 예약생성이 불가합니다.
    const alreadyAcceptStatus = await this.reservationRepository.acceptStatus(
      petsitterId,
      reservationDate
    );
    if (alreadyAcceptStatus) {
      throw new HttpError.Conflict('상태가 ACCEPT인 예약이 이미 존재합니다.');
    }

    const reservationData = {
      userId,
      petsitterId,
      reservationDate,
      animalType, // 대문자로 변환하여 저장
      hour,
      etc,
    };
    return await this.reservationRepository.createReservation(reservationData);
  }

  // 나의 예약 목록 조회 서비스 함수
  async getReservationService(userId, sort) {
    // 나의 예약이 없으면 조회가 안됨 남의거 보이면 안됨
    const noReservation = await this.reservationRepository.getReservation(userId, sort);
    if (noReservation.length === 0) {
      throw new HttpError.NotFound('예약내역이 존재하지 않습니다.');
    }
    return await this.reservationRepository.getReservation(userId, sort);
  }

  // 예약 상세 조회 서비스 함수
  async getReservationByIdService(reservationId, userId) {
    const notMyReservation = await this.reservationRepository.getReservationById(
      reservationId,
      userId
    );
    if (!notMyReservation || notMyReservation.userId !== userId) {
      throw new HttpError.NotFound('본인의 예약 내역만 조회가 가능합니다.');
    }
    return await this.reservationRepository.getReservationById(Number(reservationId), userId);
  }

  // 예약 수정 서비스 함수
  async updateReservationService(reservationId, userId, data = {}) {
    // reservationStatus 필드를 제거합니다.
    // eslint-disable-next-line no-unused-vars
    const { reservationStatus, animalType, hour, etc, ...updateData } = data;

    // 자신의 예약 내역이 아니면 수정이 불가합니다.
    const reservation = await this.reservationRepository.getReservationById(reservationId, userId);
    if (!reservation || reservation.userId !== userId) {
      throw new HttpError.NotFound('본인의 예약 내역만 수정이 가능합니다.');
    }

    // 예약상태가 AWAIT가 아니면 수정이 불가합니다.
    const cantUpdateStatus = await this.reservationRepository.awaitStatus(reservationId, userId);
    if (!cantUpdateStatus) {
      throw new HttpError.Conflict('예약상태가 AWAIT가 아니면 수정이 불가합니다.');
    }

    // animalType hour etc를 updateData에 다시 추가
    if (animalType !== undefined) {
      updateData.animalType = animalType;
    }
    if (hour !== undefined) {
      updateData.hour = hour;
    }
    if (etc !== undefined) {
      updateData.etc = etc;
    }
    // 예약을 수정합니다.
    await this.reservationRepository.updateReservation(reservationId, userId, updateData);

    // 수정된 예약 내역을 다시 조회하여 반환합니다.
    const updatedReservation = await this.reservationRepository.getReservationById(
      reservationId,
      userId
    );
    return updatedReservation;
  }

  // 예약 삭제 서비스 함수
  async deleteReservationService(reservationId, userId) {
    //자신의 예약 내역이 아니면 삭제가 불가합니다.
    const reservation = await this.reservationRepository.getReservationById(reservationId, userId);
    if (!reservation || reservation.userId !== userId) {
      throw new HttpError.NotFound('본인의 예약 내역만 삭제 가능합니다.');
    }
    // 예약상태가 AWAIT가 아니면 삭제가 불가합니다.
    const cantUpdateStatus = await this.reservationRepository.awaitStatus(reservationId, userId);
    if (!cantUpdateStatus) {
      throw new HttpError.Conflict('예약상태가 AWAIT가 아니면 삭제가 불가합니다.');
    }
    return await this.reservationRepository.deleteReservation(Number(reservationId), userId);
  }
}

export default ReservationService;
