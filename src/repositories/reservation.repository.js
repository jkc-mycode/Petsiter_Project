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
      include: {
        user: true, // 사용자의 정보를 포함
      },
    });
  }
}
export default new reservationRepository();
