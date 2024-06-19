import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';
import { PetsitterRepository } from '../repositories/petsitter.repository.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
const petsitterRepository = new PetsitterRepository(prisma);


export default async function accessToken(req, res, next) {
  try {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN);
    }

    const [tokenType, accessToken] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE);
    }

    const decodedToken = jwt.verify(accessToken, process.env.PETSITTER_ACCESS_TOKEN_SECRET_KEY);
    if (!decodedToken) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.INVALID);
    }
 
    const petsitterId = decodedToken.petsitter;

   
    const petsitter = await petsitterRepository.findPetsitterById(petsitterId);

    if (!petsitter) {
      res.clearCookie('authorization');
      throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
    }
    // req.petsitter에 데이터를 할당합니다.
    req.petsitter = petsitter;

    next();
  } catch (err) {
    console.error(err);
    switch (err.name) {
      case 'TokenExpiredError':
        return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.EXPIRED });
      case 'JsonWebTokenError':
        return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.MANIPULATED});
      default:
        return res
          .status(401)
          .json({ message: err.message ?? MESSAGES.AUTH.COMMON.JWT.INVALID});
    }
  }
}