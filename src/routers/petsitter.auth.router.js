import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterAuthController } from '../controllers/petsitter.auth.controller.js';
import { PetsitterAuthService } from '../services/petsitter.auth.service.js';
import { PetsitterAuthRepository } from '../repositories/petsitter.auth.repository.js';
import { petsitterSignUpValidator } from '../middlewares/validators/petsitter-sign-up-validator.middleware.js';
import { petsitterSignInValidator } from '../middlewares/validators/petsitter-sign-in-validator.middleware.js';
import petsitterRefreshTokenMiddleware from '../middlewares/petsitter-refresh-token-middleware.js';
const petsitterAuthRouter = express.Router();

const petsitterAuthRepository = new PetsitterAuthRepository(prisma);
const petsitterAuthService = new PetsitterAuthService(petsitterAuthRepository);
const petsitterAuthController = new PetsitterAuthController(petsitterAuthService);

// 펫시터 회원가입
petsitterAuthRouter.post('/sign-up', petsitterSignUpValidator, petsitterAuthController.signUp);

// 펫시터 로그인
petsitterAuthRouter.post('/sign-in', petsitterSignInValidator, petsitterAuthController.signIn);

// 펫시터 로그아웃
petsitterAuthRouter.post(
  '/sign-out',
  petsitterRefreshTokenMiddleware,
  petsitterAuthController.SignOut
);

// 펫시터 토큰 재발급
petsitterAuthRouter.post(
  '/retoken',
  petsitterRefreshTokenMiddleware,
  petsitterAuthController.ReToken
);

export default petsitterAuthRouter;
