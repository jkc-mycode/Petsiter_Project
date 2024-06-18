import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import ReviewController from '../controllers/review.controller.js';
import ReviewService from '../services/review.service.js';
import { ReviewRepository } from '../repositories/review.repository.js';

const reviewRouter = express.Router();

const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

// 리뷰 생성
reviewRouter.post('/:reservationId/review', reviewController.createReviewController);

// // 리뷰 조회
// reviewRouter.get('reservation/:reservationId/review', reviewController.getReviewController);

// // 리뷰 수정
// reviewRouter.patch('/reservation/:reservationId/review/:id', reviewController.updateReviewController);

// // 리뷰 삭제
// reviewRouter.delete('/reservation/:reservationId/review/:id', reviewController.deleteReviewController);

export default reviewRouter;