import { prisma } from '../utils/prisma.util.js';

class reservationRepository {
  // 예약 생성
  async createReservation(data) {
    console.log('data', data);
    return prisma.reservation.create({ data });
  }

  // 예약 목록 조회
  async getReservation(userId, sort) {
    return prisma.reservation.findMany({
      where: { userId },
      orderBy: {
        createdAt: sort,
      },
    });
  }
  // 예약 상세 조회
  async getReservationById(reservationId, userId) {
    return prisma.reservation.findUnique({
      where: {
        reservationId,
        userId,
      },
    });
  }
  // 예약 수정
  async updateReservation(reservationId, userId, data) {
    return prisma.reservation.update({
      where: {
        reservationId: reservationId,
        userId: userId,
      },
      data,
    });
  }
  // 예약 삭제
  async deleteReservation(reservationId, userId) {
    return prisma.reservation.delete({
      where: {
        reservationId: reservationId,
        userId: userId,
      },
    });
  }
}
export default new reservationRepository();
