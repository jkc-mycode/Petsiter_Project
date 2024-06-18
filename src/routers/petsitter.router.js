import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterController } from '../controllers/petsitter.controller.js';
import { PetsitterService } from '../services/petsitter.service.js';
import { PetsitterRepository } from '../repositories/petsitter.repository.js';

const petsitterRouter = express.Router();

const petsitterRepository = new PetsitterRepository(prisma);
const petsitterService = new PetsitterService(petsitterRepository);
const petsitterController = new PetsitterController(petsitterService);

// 펫시터 목록 조회 API
petsitterRouter.get('/', petsitterController.getPetsitterList);

export default petsitterRouter;
