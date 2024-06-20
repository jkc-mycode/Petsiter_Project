import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { AdminController } from '../controllers/admin.controller.js';
import { AdminService } from '../services/admin.service.js';
import { AdminRepository } from '../repositories/admin.repository.js';
import { adminCreateValidator } from '../middlewares/validators/admin-create-validator.middleware.js';
import { adminUpdateValidator } from '../middlewares/validators/admin-update-validator.middleware.js';
import userAccessTokenMiddleware from '../middlewares/auth-access-token.middleware.js';
const adminRouter = express.Router();

const adminRepository = new AdminRepository(prisma);
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

// 관리자 문의 작성
adminRouter.post('/', userAccessTokenMiddleware, adminCreateValidator, adminController.createQna);

// 관리자 문의 조회
adminRouter.get('/', userAccessTokenMiddleware, adminController.getAllQna);

// 본인 문의내역 조회
adminRouter.get('/mydetail', userAccessTokenMiddleware, adminController.getQnaById);

//관리자 문의 수정
adminRouter.patch(
  '/:qnaId',
  userAccessTokenMiddleware,
  adminUpdateValidator,
  adminController.updateQna
);

// 관리자 문의 삭제
adminRouter.delete('/:qnaId', userAccessTokenMiddleware, adminController.deleteQna);

export default adminRouter;
