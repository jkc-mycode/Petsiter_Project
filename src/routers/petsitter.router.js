import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterController } from '../controllers/petsitter.controller.js';
import { PetsitterService } from '../services/petsitter.service.js';
import { PetsitterRepository } from '../repositories/petsitter.repository.js';
import petsitterAccessToken from '../middlewares/petsitter-access-token-middleware.js';
// import { petsitterMypageValidator } from '../middlewares/validators/petsitter-mypage-middleware.js';

const petsitterRouter = express.Router();

const petsitterRepository = new PetsitterRepository(prisma);
const petsitterService = new PetsitterService(petsitterRepository);
const petsitterController = new PetsitterController(petsitterService);



// 펫시터 목록 조회 API
petsitterRouter.get('/', petsitterController.getPetsitterList);

// // 펫시터 본인정보조회 API
petsitterRouter.get('/mypage', petsitterAccessToken, petsitterController.getPetsitterById);

// 펫시터 상세 조회 API
petsitterRouter.get('/:petsitterId', petsitterController.getPetsitterDetail);

// 펫시터 정보 수정 API
petsitterRouter.patch('/:petsitterId', petsitterController.updatePetsitter);

// 펫시터 예약 현황 조회 API
petsitterRouter.get('/:petsitterId/reservation', petsitterController.getPetsitterReservationList);

// 펫시터 예약 상태 변경 API
petsitterRouter.patch('/:petsitterId/reservation', petsitterController.updatePetsitterReservation);

// 펫시터 검색 API (이름, 지역, 가격, 경력)
petsitterRouter.get('/search/type', petsitterController.searchPetsitter);

export default petsitterRouter;
