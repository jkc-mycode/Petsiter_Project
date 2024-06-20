import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { AdminController } from '../controllers/admin.controller.js';
import { AdminService } from '../services/admin.service.js';
import { AdminRepository } from '../repositories/admin.repository.js';
// import { petsitterSignUpValidator } from '../middlewares/validators/petsitter-sign-up-validator.middleware.js';
// import { petsitterSignInValidator } from '../middlewares/validators/petsitter-sign-in-validator.middleware.js';
import userAccessTokenMiddleware from '../middlewares/auth-access-token.middleware.js';
const adminRouter = express.Router();

const adminRepository = new AdminRepository(prisma);
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

// 관리자 문의 작성
adminRouter.post('/', userAccessTokenMiddleware, adminController.createQna);

// 관리자 문의 조회
adminRouter.get('/', userAccessTokenMiddleware, adminController.getAllQna);

//관리자 문의 수정
adminRouter.patch('/:qnaId', userAccessTokenMiddleware, adminController.updateQna);

// 관리자 문의 삭제
adminRouter.delete('/:qnaId', userAccessTokenMiddleware, adminController.deleteQna);

export default adminRouter;
