import { HttpError } from '../errors/http.error.js'; // 필요한 HttpError 모듈 임포트
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PETSITTERMESSAGES } from '../constants/petsitter.auth.message.constant.js';

export class PetsitterAuthService {
  constructor(petsitterAuthRepository) {
    this.petsitterAuthRepository = petsitterAuthRepository;
  }

  // 펫시터 회원가입
  petsitterSignUp = async ({
    email,
    password,
    petsitterName,
    petsitterCareer,
    petsitterProfileImage,
    title,
    content,
    region,
    price,
    totalRate,
  }) => {
    const petsitter = await this.petsitterAuthRepository.findPetsitterByEmail(email);
    if (petsitter) {
      throw new HttpError.Conflict(PETSITTERMESSAGES.PETSITTER.COMMON.EMAIL.DUPLICATED);
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const petsitterInfo = await this.petsitterAuthRepository.createPetsitter({
      email,
      password: hashedPassword,
      petsitterName,
      petsitterCareer,
      petsitterProfileImage,
      title,
      content,
      region,
      price,
      totalRate,
    });

    // 반환 전에 비밀번호 필드 삭제
    delete petsitterInfo.password;

    return petsitterInfo;
  };

  PetsitterSignIn = async (email, password) => {
    try {
      // 이메일로 펫시터 조회
      const petsitter = await this.petsitterAuthRepository.findPetsitterByEmail(email);
      if (!petsitter) {
        throw new HttpError.NotFound(PETSITTERMESSAGES.PETSITTER.COMMON.EMAIL.NOT_FOUND);
      }

      // 비밀번호가 일치하지 않는 경우
      const passwordMatch = await bcrypt.compare(password, petsitter.password);
      if (!passwordMatch) {
        throw new HttpError.Unauthorized(
          PETSITTERMESSAGES.PETSITTER.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD
        );
      }

      // JWT 토큰 생성
      const accessToken = jwt.sign(
        { petsitter: petsitter.petsitterId },
        process.env.PETSITTER_ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.PETSITTER_ACCESS_TOKEN_EXPIRES_IN }
      );

      const refreshToken = jwt.sign(
        { petsitterId: petsitter.petsitterId },
        process.env.PETSITTER_REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.PETSITTER_REFRESH_TOKEN_EXPIRES_IN }
      );

      const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

      // Refresh 토큰을 db에 저장
      await this.petsitterAuthRepository.createRefreshToken(
        petsitter.petsitterId,
        hashedRefreshToken
      );

      return { accessToken, refreshToken };
    } catch (err) {
      throw new HttpError.InternalServerError(PETSITTERMESSAGES.PETSITTER.SERVICE.ERROR);
    }
  };

  petsitterSignOut = async (petsitterId) => {
    if (!petsitterId) {
      throw new HttpError.NotFound('Petsitter not found');
    }

    const signout = await this.petsitterAuthRepository.SignoutPetsitter(petsitterId);

    return {
      petsitterId: signout.petsitterId,
    };
  };
}
