
import { HttpError } from '../errors/http.error.js'; // 필요한 HttpError 모듈 임포트
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PETSITTERMESSAGES } from '../constants/petsitter.message.constant.js';

export class PetsitterAuthService {
    constructor(petsitterRepository) {
      this.petsitterRepository = petsitterRepository;
    }

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
    const petsitter = await this.petsitterRepository.findPetsitterByEmail(email);
    if (petsitter) {
      throw new HttpError.Conflict(PETSITTERMESSAGES.PETSITTER.COMMON.EMAIL.DUPLICATED);
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const petsitterInfo = await this.petsitterRepository.createPetsitter({
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


  PetsittersignIn = async (email, password) => {
    try {
      // 이메일로 펫시터 조회
      const petsitter = await this.petsitterRepository.findPetsitterByEmail(email);
      if (!petsitter) {
        throw new HttpError.NotFound(PETSITTERMESSAGES.PETSITTER.COMMON.EMAIL.NOT_FOUND);
      }


      // 비밀번호가 일치하지 않는 경우
      const passwordMatch = await bcrypt.compare(password, petsitter.password);
      if (!passwordMatch) {
        throw new HttpError.Unauthorized(PETSITTERMESSAGES.PETSITTER.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD);
      }

      // JWT 토큰 생성
      const accessToken = jwt.sign(
        { petsitter: petsitter.petsitterId },
        process.env.PETSITTER_ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '12h' }
      );
  
      return { accessToken};
    } catch (err) {
      throw new HttpError.InternalServerError(PETSITTERMESSAGES.PETSITTER.SERVICE.ERROR);
    }
  };






}