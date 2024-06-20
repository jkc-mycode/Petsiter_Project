import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { USER_REFRESH_TOKEN_SECRET_KEY } from '../constants/env.constant.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AUTH_MESSAGE } from '../constants/auth.message.constant.js';

export default async (req, res, next) => {
  try {
    const userRepository = new UserRepository();

    const refreshToken = req.headers['authorization'];
    if (!refreshToken) {
      res.status(401).json({ message: AUTH_MESSAGE.AUTH.TOKEN.NOT_FOUND });
      return;
    }

    const [tokenType, token] = refreshToken.split(' ');
    if (tokenType !== 'Bearer') {
      res.status(401).json({ message: AUTH_MESSAGE.AUTH.TOKEN.NOT_APPLY });
      return;
    }

    const decodedToken = jwt.verify(token, USER_REFRESH_TOKEN_SECRET_KEY);

    // DB에 refreshToken을 조회
    const existedRefreshToken = await userRepository.getRefreshToken(decodedToken.id);

    // 조회된 refreshToken과 비교

    // existedRefreshToken 존재하는지 안하는지 존재 한다면 existedRefreshToken.refreshToken을 준다.
    // const isValidRefreshToken = existedRefreshToken && existedRefreshToken?.refreshToken 를 줄인게
    // existedRefreshToken?.refreshToken && 의 형태이다.
    const isValidRefreshToken =
      existedRefreshToken?.refreshToken &&
      (await bcrypt.compare(token, existedRefreshToken.refreshToken));

    if (!isValidRefreshToken) {
      res.status(409).json({ errorMessage: AUTH_MESSAGE.AUTH.TOKEN.EXPIRED });
      return;
    }

    const user = await userRepository.getRefreshToken(decodedToken.id);

    if (!user) {
      res.status(400).json({ errorMessage: AUTH_MESSAGE.AUTH.TOKEN.NOT_MATCH_USER });
      return;
    }

    req.user = user;

    next();
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        return res.status(401).json({ message: AUTH_MESSAGE.AUTH.TOKEN.EXPIRED });
      case 'JsonWebTokenError':
        return res.status(401).json({ message: AUTH_MESSAGE.AUTH.TOKEN.NOT_VALID });
      default:
        return res.status(401).json({ message: AUTH_MESSAGE.AUTH.TOKEN.NOT_VALID });
    }
  }
};
