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
    if (!petsitters) throw new HttpError.NotFound('해당 펫시터가 존재하지 않습니다.');

    // 펫시터 출력 양식 설정
    petsitters = petsitters.map((petsitter) => {
      return {
        petsitterId: petsitter.petsitterId,
        title: petsitter.title,
        region: petsitter.region,
        total_rate: petsitter.total_rate,
        review_count: petsitter.review.length,
        createdAt: petsitter.createdAt,
        updatedAt: petsitter.updatedAt,
        houseImage: petsitter.houseImage,
      };
    });

    return petsitters;
  };

  // 펫시터 상세 조회
  getPetsitterDetail = async (petsitterId) => {
    let petsitter = await this.petsitterRepository.getPetsitterDetail(petsitterId);
    if (!petsitter) throw new HttpError.NotFound('해당 펫시터가 존재하지 않습니다.');

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
      review: petsitter.review,
    };
  };

  // 펫시터 정보 수정
  updatePetsitter = async (
    petsitterId,
    petsitterName,
    petsitterCareer,
    petsitterProfileImage,
    title,
    content,
    region,
    price
  ) => {
    const petsitter = await this.petsitterRepository.getPetsitterDetail(petsitterId);
    if (!petsitter) throw new HttpError.NotFound('해당 펫시터가 존재하지 않습니다.');
    const updatedPetsitter = await this.petsitterRepository.updatePetsitter(
      petsitterId,
      petsitterName,
      petsitterCareer,
      petsitterProfileImage,
      title,
      content,
      region,
      price
    );

    return updatedPetsitter;
  };
}
