import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterRepository } from '../repositories/petsitter.repository.js';
import { PetsitterAuthRepository } from '../repositories/petsitter.auth.repository.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
const petsitterRepository = new PetsitterRepository(prisma);
const petsitterAuthRepository = new PetsitterAuthRepository(prisma);
export default async function (req, res, next) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN);
    }

    const [tokenType, refreshToken] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE);
    }

    let decodedToken;

    decodedToken = jwt.verify(refreshToken, process.env.PETSITTER_REFRESH_TOKEN_SECRET_KEY);

    // if ('TokenExpiredError') {
    //   return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.EXPIRED });
    // }

    const petsitterId = decodedToken.petsitterId;

    const storedRefreshToken = await petsitterAuthRepository.createRefreshToken(petsitterId);
    const hashedToken = storedRefreshToken.petsitterRefreshToken;
    //  해싱한 토큰을 비교하는 과정입니다.
    const isMatch = await bcrypt.compare(refreshToken, hashedToken);

    if (!isMatch) {
      return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.DISCARD });
    }

    const petsitter = await petsitterRepository.findPetsitterById(petsitterId);
    if (!petsitter) {
      throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
    }

    req.petsitter = petsitter;
    next();
  } catch (error) {
    return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.INVALID });
  }
}
