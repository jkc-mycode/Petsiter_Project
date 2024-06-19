import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY } from '../constants/env.constant.js';
import { UserRepository } from '../repositories/user.repository.js';

export default async (req, res, next) => {
  try {
    const userRepository = new UserRepository();

    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      res.status(401).json({ errerMessage: '인증 정보가 없습니다.' });
      return;
    }

    const [tokenType, token] = accessToken.split(' ');
    if (tokenType !== 'Bearer') {
      res.status(401).json({ errerMessage: '지원하지 않는 인증 방식입니다.' });
      return;
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    // const user = await userRepository.findUserById(decodedToken.id);
    const user = await userRepository.findUserById(decodedToken.id);

    if (!user) {
      res.status(400).json({ errorMessage: '인증 정보와 일치하는 사용자가 없습니다.' });
    }

    req.user = user;
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
