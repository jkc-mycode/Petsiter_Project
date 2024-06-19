// src/controllers/review.controller.js
import { HttpError } from "../errors/http.error.js";
import { REVIEW_MESSAGE } from "../constants/review.constant.js";  

export default class ReviewController {

  // 의존성 주입
  constructor(reviewService) {
    this.reviewService  = reviewService;
  }
  // 리뷰 생성
  createReviewController = async (req, res, next) => {
    const { reservationId } = req.params;
    const userId = 1; // req.user.id; 테스트용
    const { review, rate } = req.body;

    try {
      // 예약ID에 펫시터ID가 있는지 확인
      const reservationCheck = await this.reviewService.reservationPetsitterCheck(+reservationId);
      if (!reservationCheck) {
        throw new HttpError.NotFound(REVIEW_MESSAGE.NO_PETSITTER_ID_IN_RESERVATION);
      }
      // 게시글이 존재하는지 확인하기
      const newReview = await this.reviewService.createReview (
        +reservationId,
        userId,
        reservationCheck.petsitterId,
        review,
        rate
      );

      // 성공했을 때 리뷰 데이터 반환
      return res.status(201).json(newReview); 
    } catch (err) {
      // 게시글이 존재하지 않을 때 
      console.error(err);
      next(err);
    }
  }

  // 리뷰 조회
  getReviewController = async (req, res, next) => {
    const { reservationId } = req.params;
    const userId = 1; // req.user.id; 테스트용

    try {
      // 예약 ID와 사용자 ID로 리뷰를 조회
      const review = await this.reviewService.getReviewsByReservationId(+reservationId, userId);
      // 리뷰가 존재하는지 확인
      if (!review) {
        throw new HttpError.NotFound(REVIEW_MESSAGE.NO_REVIEW_FOUND);
      }

      // 성공했을 때 리뷰 데이터 반환
      return res.status(200).json(review);
    } catch (err) {
      // 에러 처리
      console.error(err);
      next(err);
    }
  }

  // 리뷰 수정
  updateReviewController = async (req, res, next) => {
    const { reviewId } = req.params;
    const userId = 1; // req.user.id; 테스트용
    const { review, rate } = req.body;

    try {
      // 리뷰 ID가 유효한지 확인
      if (!reviewId || isNaN(reviewId)) {
        throw new HttpError.BadRequest(REVIEW_MESSAGE.INVALID_REVIEW_ID);
      }

      // 리뷰가 존재하는지 확인
      const existingReview = await this.reviewService.getReviewsByReservationId(+reviewId);
      if (!existingReview) {
        throw new HttpError.NotFound(REVIEW_MESSAGE.REVIEW_NOT_FOUND);
      }

      // 리뷰 작성자가 현재 로그인한 사용자인지 확인
      if (existingReview.userId !== userId) {
        throw new HttpError.Forbidden(REVIEW_MESSAGE.UNAUTHORIZED_REVIEW_UPDATE);
      }

      // 리뷰 수정
      const updatedReview = await this.reviewService.updateReview(
        +reviewId,
        review,
        rate
      );

      // 성공했을 때 수정된 리뷰 데이터 반환
      return res.status(200).json(updatedReview);
    } catch (err) {
      // 에러 처리
      console.error(err);
      next(err);
    }
  }

} 