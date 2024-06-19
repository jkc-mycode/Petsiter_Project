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
} 