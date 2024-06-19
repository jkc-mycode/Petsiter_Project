// 펫시터 회원가입

import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { PETSITTERMESSAGES } from '../constants/petsitter.auth.message.constant.js';
export class PetsitterAuthController {
  constructor(petsitterAuthService) {
    this.petsitterAuthService = petsitterAuthService;
  }

  signUp = async (req, res, next) => {
    const {
      email,
      password,
      petsitterName,
      petsitterCareer,
      title,
      content,
      region,
      price,
      totalRate,
    } = req.body;
    try {
      const petsitter = await this.petsitterAuthService.petsitterSignUp({
        email,
        password,
        petsitterName,
        petsitterCareer,
        title,
        content,
        region,
        price,
        totalRate,
      });
      return res.status(201).json({
        status: HTTP_STATUS.CREATED,
        message: PETSITTERMESSAGES.PETSITTER.COMMON.SIGN_UP.SUCCEED,
        petsitter,
      });
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const { accessToken, refreshToken } = await this.petsitterAuthService.PetsitterSignIn(
        email,
        password
      );

      res.header('authorization', accessToken, refreshToken);
      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: PETSITTERMESSAGES.PETSITTER.COMMON.SIGN_IN.SUCCEED,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  };

  SignOut = async (req, res, next) => {
    const petsitter = req.petsitter;
    try {
      const result = await this.petsitterAuthService.petsitterSignOut(petsitter.petsitterId);
      return res.status(200).json({
        status: 200,
        message: '로그아웃에 성공했습니다.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
