class ReservationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 예약 생성
  async createReservation(data) {
    return this.prisma.reservation.create({ data });
  }

  // 예약 목록 조회
  async getReservation(userId, sort) {
    return this.prisma.reservation.findMany({
      where: { userId },
      orderBy: {
        createdAt: sort,
      },
    });
  }

  // 예약 상세 조회
  async getReservationById(reservationId, userId) {
    return this.prisma.reservation.findFirst({
      where: {
        reservationId: Number(reservationId),
        userId: userId,
      },
      include: { user: true },
    });
  }

  // 예약 수정
  async updateReservation(reservationId, userId, data) {
    return this.prisma.reservation.updateMany({
      where: {
        reservationId: Number(reservationId),
        userId: userId,
      },
      data,
    });
  }

  // 예약 삭제
  async deleteReservation(reservationId, userId) {
    return this.prisma.reservation.deleteMany({
      where: {
        reservationId: Number(reservationId),
        userId: userId,
      },
    });
  }
}

export default ReservationRepository;
