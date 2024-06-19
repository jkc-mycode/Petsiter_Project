
import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterAuthController } from '../controllers/petsitter.auth.controller.js';
import { PetsitterAuthService } from '../services/petsitter.auth.service.js';
import { PetsitterRepository } from '../repositories/petsitter.repository.js';
import { petsitterSignUpValidator } from '../middlewares/validators/petsitter-sign-up-validator.middleware.js';
// 추후 회원가입 시 사용 import { petsitterMypageValidator } from '../middlewares/validators/petsitter-mypage-middleware.js';



const petsitterAuthRouter = express.Router();

const petsitterRepository = new PetsitterRepository(prisma);
const petsitterAuthService = new PetsitterAuthService(petsitterRepository);
const petsitterAuthController = new PetsitterAuthController(petsitterAuthService);

// 펫시터 회원가입
petsitterAuthRouter.post('/sign-up', petsitterSignUpValidator, petsitterAuthController.signUp);



export default petsitterAuthRouter;



