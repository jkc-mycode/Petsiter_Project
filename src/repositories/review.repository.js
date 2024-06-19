// src/repositories/review.repository.js
export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 리뷰 생성
  createReview = async ( reservationId, userId, petsitterId, review, rate ) => {
    // 새로운 리뷰 생성
    const newReview = await this.prisma.review.create ({
      data: {
        reservationId,
        userId,
        petsitterId,
        review,
        rate
      },
    });
    // 생성된 리뷰 데이터 반환
    return newReview;
  }
  isPetsitterOwnerOfReservation = async(reservationId) => {
    const reservation = await this.prisma.reservation.findUnique({
      where:{reservationId}})
    return reservation;
  }
  // 리뷰 ID 존재 여부 확인
  reviewExists = async (reservationId, userId) => {
    const existingReview = await this.prisma.review.findFirst({
      where: { reservationId, userId },
    });
    return existingReview;
  }

  // 리뷰 조회
  getReviewsByReservationId = async (reservationId, userId) => {
    // 예약 ID와 사용자 ID로 내가 작성한 리뷰만 가져오기
    const reviews = await this.prisma.review.findMany({
      where: { 
        reservationId,
        userId
      },
      include: {
        user: true,
        petsitter: true,
        reservation: true
      }
    });
    return reviews;
  }


}