import jwt from 'jsonwebtoken';
import { prisma } from '../routers/index.js';
import { PetsitterRepository } from '../repositories/petsitter.auth.repository.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
const petsitterRepository = new PetsitterRepository(prisma);




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
    try {
      decodedToken = jwt.verify(refreshToken, process.env.PETSITTER_REFRESHTOKEN_SECRET_KEY);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.EXPIRED });
      } 
    }
    const petsitterId = decodedToken.petsitter;

    const petsitter = await petsitterRepository. findPetsitterById(petsitterId);
    if (!petsitter) {
        throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
    }

    const storedRefreshToken =  await petsitterRepository.createToken(petsitterId);
    if (!storedRefreshToken || storedRefreshToken.token !== refreshToken) {
      return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.DISCARD });
    }

    req.petsitter = petsitter;
    next();
  } catch (error) {
    return res.status(401).json({ message: MESSAGES.AUTH.COMMON.JWT.INVALID });
  }
}