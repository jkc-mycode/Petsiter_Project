// src/services/review.service.js
export default class ReviewService {

  // 의존성 주입
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }
   // 리뷰 생성
  createReview = async ( reservationId, userId, petsitterId, review, rate )=> {
    const newReview = await this.reviewRepository.createReview (
      reservationId,
      userId,
      petsitterId,
      review,
      rate
    );
    // 생성된 리뷰 객체 반환
    return newReview;
  }

  // 예약아이디로 펫시터아이디가 있는지 가져오기
  reservationPetsitterCheck = async (reservationId) => {
    return await this.reviewRepository.isPetsitterOwnerOfReservation(reservationId);
  };
}