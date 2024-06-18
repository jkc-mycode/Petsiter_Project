import bcrypt from 'bcrypt';
import { HttpError } from '../errors/http.error.js'; // 필요한 HttpError 모듈 임포트

export class PetsitterService {
  constructor(petsitterRepository) {
    this.petsitterRepository = petsitterRepository;
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

  // 펫시터 목록 조회
  getPetsitterList = async (orderByCondition) => {
    // 펫시터 목록 조회
    let petsitters = await this.petsitterRepository.getPetsitterList(orderByCondition);
    if (!petsitters) throw new HttpError.NotFound('펫시터가 존재하지 않습니다.');

    // 펫시터 출력 양식 설정
    petsitters = petsitters.map((petsitter) => {
      return {
        petsitterId: petsitter.petsitterId,
        petsitterName: petsitter.petsitterName,
        petsitterCareer: petsitter.petsitterCareer,
        petsitterProfileImage: petsitter.petsitterProfileImage,
        title: petsitter.title,
        content: petsitter.content,
        region: petsitter.region,
        total_rate: petsitter.total_rate,
        createdAt: petsitter.createdAt,
        updatedAt: petsitter.updatedAt,
        certificate: petsitter.certificate,
        houseImage: petsitter.houseImage,
      };
    });

    return petsitters;
  };


// 펫시터 본인정보 조회

getPetsitterByEmail = async ( email, password) => {

    const petsitter = await this.petsitterRepository.findPetsitterByEmail(email);
    if (!petsitter) throw new HttpError.NotFound('펫시터가 존재하지 않습니다.');

    // 비밀번호가 일치하지 않을 경우 경고 메시지 발송
    const passwordMatch = await bcrypt.compare(password, petsitter.password);
    if (!passwordMatch) {
      throw new HttpError.Unauthorized('비밀번호가 일치하지 않습니다.');
    }

    return {
      petsitterId: petsitter.petsitterId,
      petsitterName: petsitter.petsitterName,
      petsitterCareer: petsitter.petsitterCareer,
      petsitterProfileImage: petsitter.petsitterProfileImage,
      content: petsitter.content,
      region: petsitter.region,
      price: petsitter.price,
      totalRate: petsitter.totalRate,
      createdAt: petsitter.createdAt,
      updatedAt: petsitter.updatedAt,
    };
  } 
};


