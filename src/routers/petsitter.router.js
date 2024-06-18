import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterController } from '../controllers/petsitter.controller.js';
import { PetsitterService } from '../services/petsitter.service.js';
import { PetsitterRepository } from '../repositories/petsitter.repository.js';
import { petsitterSignUpValidator } from '../middlewares/validators/petsitter-sign-up-validator.middleware.js';
import { petsitterMypageValidator } from '../middlewares/validators/petsitter-mypage-middleware.js';

const petsitterRouter = express.Router();

const petsitterRepository = new PetsitterRepository(prisma);
const petsitterService = new PetsitterService(petsitterRepository);
const petsitterController = new PetsitterController(petsitterService);

// 펫시터 회원가입
petsitterRouter.post('/', petsitterSignUpValidator, petsitterController.signUp);

// 펫시터 목록 조회 API
petsitterRouter.get('/', petsitterController.getPetsitterList);

// 펫시터 본인정보조회 API
petsitterRouter.get('/mypage', petsitterMypageValidator, petsitterController.getPetsitterByEmail);

// 펫시터 상세 조회 API
petsitterRouter.get('/:petsitterId', petsitterController.getPetsitterDetail);

// 펫시터 정보 수정 API
petsitterRouter.patch('/:petsitterId', petsitterController.updatePetsitter);

// 펫시터 예약 현황 조회 API
petsitterRouter.get('/:petsitterId/reservation', petsitterController.getPetsitterReservationList);

// 펫시터 예약 상태 변경 API
petsitterRouter.patch('/:petsitterId/reservation', petsitterController.updatePetsitterReservation);

export default petsitterRouter;
