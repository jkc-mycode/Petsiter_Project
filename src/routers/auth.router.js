import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import UserRefreshToken from '../middlewares/user-refresh-token.middleware.js';
import { authSignInValidator } from '../middlewares/validators/auth-sign-in-validator.middleware.js';
import { authSignUpValidator } from '../middlewares/validators/auth-sign-up-validator.middleware.js';

const authrouter = express.Router();
const authController = new AuthController();

authrouter.post('/sign-up', authSignUpValidator, authController.signUp);

authrouter.post('/sign-in', authSignInValidator, authController.signIn);

// 토큰 재발급
authrouter.post('/token', UserRefreshToken, authController.token);

// 로그아웃
authrouter.post('/sign-out', UserRefreshToken, authController.signOut);

export default authrouter;
