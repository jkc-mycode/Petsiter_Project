import { prisma } from '../utils/prisma.util.js';

class reservationRepository {
  // 예약 생성
  async createReservation(data) {
    return prisma.reservation.create({ data });
  }
}
export default new reservationRepository();
