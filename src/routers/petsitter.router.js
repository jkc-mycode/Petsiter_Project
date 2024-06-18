import express from 'express';
import { PetsitterRepository} from '../repositories/petsitter.repository.js';
import {PetsitterService } from '../services/petsitter.service.js';
import { PetsitterController} from '../controllers/petsitter.controller.js';
import { petsitterSignUpValidator } from "../middlewares/validators/petsitter-sign-up-validator.middleware.js";
import { prisma } from '../utils/prisma.util.js';

const  petsitterRouter = express.Router();


const petsitterRepository = new PetsitterRepository(prisma);
const petsitterService = new PetsitterService(petsitterRepository );
const petsitterController = new PetsitterController(petsitterService);



petsitterRouter.post('/sign-up', petsitterSignUpValidator, petsitterController.signUp);





export { petsitterRouter };