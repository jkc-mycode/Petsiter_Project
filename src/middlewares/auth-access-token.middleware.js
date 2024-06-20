import jwt from 'jsonwebtoken';
import { USER_ACCESS_TOKEN_SECRET_KEY } from '../constants/env.constant.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AUTH_MESSAGE } from '../constants/auth.message.constant.js';

export default async (req, res, next) => {
  try {
    const userRepository = new UserRepository();

    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      res.status(401).json({ message: AUTH_MESSAGE.AUTH.TOKEN.NOT_FOUND });
      return;
    }

    const [tokenType, token] = accessToken.split(' ');
    if (tokenType !== 'Bearer') {
      res.status(401).json({ errerMessage: AUTH_MESSAGE.AUTH.TOKEN.NOT_APPLY });
      return;
    }

    const decodedToken = jwt.verify(token, USER_ACCESS_TOKEN_SECRET_KEY);

    // const user = await userRepository.findUserByIdMadeToken(decodedToken.id);
    const user = await userRepository.findUserById(decodedToken.id);

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
