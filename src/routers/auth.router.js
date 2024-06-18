import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();
const authController = new AuthController();

router.post('/auth/sign-up', authController.signUp);

router.post('/auth/sign-in', authController.signIn);

export default router;
