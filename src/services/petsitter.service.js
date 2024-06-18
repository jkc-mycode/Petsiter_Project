import bcrypt from 'bcrypt';
import { HttpError } from '../errors/http.error.js'; // 필요한 HttpError 모듈 임포트

export class PetsitterService {
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
      throw new HttpError.Conflict('이미 존재하는 이메일입니다.');
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
}