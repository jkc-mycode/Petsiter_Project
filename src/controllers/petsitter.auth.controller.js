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
    try {
      const { email, password } = req.body;

      const logIn = await this.petsitterAuthService.PetsitterSignIn(email, password);

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: PETSITTERMESSAGES.PETSITTER.COMMON.SIGN_IN.SUCCEED,
        logIn,
      });
    } catch (err) {
      next(err);
    }
  };

  signOut = async (req, res, next) => {
    const petsitter = req.petsitter;
    try {
      const result = await this.petsitterAuthService.petsitterSignOut(petsitter.petsitterId);
      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: PETSITTERMESSAGES.PETSITTER.COMMON.SIGN_OUT.SUCCEED,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  reToken = async (req, res, next) => {
    try {
      const { petsitterId } = req.petsitter;

      // 펫시터의 새로운 토큰 발급 요청 처리
      const createToken = await this.petsitterAuthService.petsitterReToken(petsitterId);

      // 클라이언트에게 새로운 토큰을 제공
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: PETSITTERMESSAGES.PETSITTER.COMMON.RETOKEN.SUCCEED,
        createToken,
      });
    } catch (err) {
      next(err); // 그 외의 경우는 에러 처리를 넘깁니다.
    }
  };
}
