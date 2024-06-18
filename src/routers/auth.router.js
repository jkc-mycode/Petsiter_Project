import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authrouter = express.Router();
const authController = new AuthController();

authrouter.post('/sign-up', authController.signUp);

authrouter.post('/sign-in', authController.signIn);

export default authrouter;
