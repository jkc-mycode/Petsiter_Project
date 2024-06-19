import express from 'express';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';
import { UserRepository } from '../repositories/user.repository.js';
import { prisma } from '../utils/prisma.util.js';
import accessToken from '../middlewares/user-access-token.middleware.js';

const userRouter = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 본인 정보 조회 api
userRouter.get('/', accessToken, userController.getUserById);

// 사용자 정보 수정 api
userRouter.patch('/', accessToken, userController.UpdateUser);

export default userRouter;
