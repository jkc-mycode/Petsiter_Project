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
  // 펫시터 존재 여부 확인
  findPetsitterById = async (petsitterId) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: {
        petsitterId: +petsitterId,
      },
    });
    return petsitter;
  };

  // 예약상태 엑셉트면 예약이 안돼요
  acceptStatus = async (petsitterId, reservationDate) => {
    const reservation = await this.prisma.reservation.findFirst({
      where: {
        petsitterId: +petsitterId,
        reservationDate,
        reservationStatus: 'ACCEPT',
      },
    });
    return reservation;
  };
  // 예약상태 대기중아니면 수정이 안돼요
  awaitStatus = async (reservationId, userId) => {
    const reservation = await this.prisma.reservation.findFirst({
      where: {
        reservationId,
        userId,
        reservationStatus: 'AWAIT',
      },
    });
    return reservation;
  };
}

export default ReservationRepository;
