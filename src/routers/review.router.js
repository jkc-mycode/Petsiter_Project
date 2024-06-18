import express from 'express';
import reviewController from '../controllers/review.controller';

const reviewRouter = express.Router();

// 리뷰 생성
// POST /api/petsitter/:petsitterId/review
reviewRouter.post('/', reviewController.createReviewController);

// // 리뷰 조회
// // GET /api/petsitter/:petsitterId/review
// reviewRouter.get('/', reviewController.getReviewController);

// // 리뷰 수정
// // PATCH /api/petsitter/:petsitterId/review/:id
// reviewRouter.patch('/:id', reviewController.updateReviewController);

// // 리뷰 삭제
// // DELETE /api/petsitter/:petsitterId/review/:id
// reviewRouter.delete('/:id', reviewController.deleteReviewController);

export { reviewRouter };