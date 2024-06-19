// src/services/review.service.js
import { HttpError } from "../errors/http.error.js";
import { REVIEW_MESSAGE } from "../constants/review.constant.js";

export default class ReviewService {

  // 의존성 주입
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }
   // 리뷰 생성
  createReview = async ( reservationId, userId, petsitterId, review, rate )=> {
    // 리뷰가 이미 존재하는지 확인
    const existingReview = await this.reviewRepository.reviewExists(reservationId, userId);
    if (existingReview) {
      throw new HttpError.Conflict(REVIEW_MESSAGE.REVIEW_ALREADY_EXISTS);
    }
    // 리뷰 생성
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