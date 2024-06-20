import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterRepository } from '../repositories/petsitter.repository.js';
import { PetsitterAuthRepository } from '../repositories/petsitter.auth.repository.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
const petsitterRepository = new PetsitterRepository(prisma);
const petsitterAuthRepository = new PetsitterAuthRepository(prisma);
export default async (req, res, next) => {
  try {
    const refreshToken = req.headers['authorization'];

    if (!refreshToken) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN);
    }

    const [tokenType, token] = refreshToken.split(' ');

    if (tokenType !== 'Bearer') {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE);
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.PETSITTER_REFRESH_TOKEN_SECRET_KEY);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.EXPIRED });
      }
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.INVALID);
    }

    const { petsitterId } = payload;

    const storedRefreshToken = await petsitterAuthRepository.getRefreshToken(petsitterId);
    const hashedToken = storedRefreshToken.petsitterRefreshToken;

    const isMatch = await bcrypt.compare(token, hashedToken);
    if (!isMatch) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.DISCARD);
    }

    const petsitter = await petsitterRepository.findPetsitterById(petsitterId);
    if (!petsitter) {
      throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
    }

    req.petsitter = petsitter;
    next();
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        return res.status(401).json({ message: '인증 정보가 만료되었습니다.' });
      case 'JsonWebTokenError':
        return res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
      default:
        return res.status(401).json({ message: err.message ?? '인증 정보가 유효하지 않습니다.' });
    }
  }
};
