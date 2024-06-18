import { prisma } from '../utils/prisma.util.js';

class reservationRepository {
  // 예약 생성
  async createReservation(data) {
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
    return prisma.reservation.findFirst({
      where: {
        reservationId: reservationId,
        userId: userId,
      },
    });
  }
}
export default new reservationRepository();
