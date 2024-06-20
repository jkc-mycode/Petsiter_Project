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

  // 리뷰 조회
  getReviewsByReservationId = async (reservationId, userId) => {
    const reviews = await this.reviewRepository.getReviewsByReservationId(reservationId, userId);
    // 가져온 리뷰가 없거나 빈 배열인 경우
    if (!reviews || reviews.length === 0) {
      throw new HttpError.NotFound(REVIEW_MESSAGE.NO_REVIEW_FOUND);
    }
    return reviews;
  };

  // 리뷰 ID로 리뷰테이블에 리뷰가 존재하는지 확인한다.
  reviewExistsById = async (reviewId) => {
    const reviewExists = await this.reviewRepository.reviewExistsById(reviewId);
    return reviewExists; 
  };

  // 리뷰 수정
  updateReview = async (reviewId, userId, review, rate) => {
    // 리뷰가 존재하는지 확인
    const existingReview = await this.reviewRepository.reviewExistsById(reviewId);
    if (!existingReview) {
      throw new HttpError.NotFound(REVIEW_MESSAGE.REVIEW_NOT_FOUND);
    }
    console.log(existingReview, userId, review);
    // 리뷰 작성자와 현재 로그인한 사용자인지 확인
    if (existingReview.userId !== userId) {
      throw new HttpError.Forbidden(REVIEW_MESSAGE.UNAUTHORIZED_REVIEW_UPDATE);
    }
    // 리뷰 수정
    const updatedReview = await this.reviewRepository.updateReview(reviewId, userId, review, rate);
    // 수정된 리뷰 객체 반환
    return updatedReview;
  }

  // 리뷰 삭제
  deleteReview = async (reviewId, userId) => {
    // 리뷰가 존재하는지 확인
    const existingReview = await this.reviewRepository.reviewExistsById(reviewId, userId);
    if (!existingReview) {
      throw new HttpError.NotFound(REVIEW_MESSAGE.REVIEW_NOT_FOUND);
    }
    console.log(existingReview, userId)
    // 리뷰 작성자와 현재 로그인한 사용자인지 확인
    if (existingReview.userId!== userId) {
      throw new HttpError.Forbidden(REVIEW_MESSAGE.UNAUTHORIZED_REVIEW_DELETE);
    }
    // 리뷰 삭제
    await this.reviewRepository.deleteReview(reviewId, userId);
  }
}