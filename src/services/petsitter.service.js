import { HttpError } from '../errors/http.error.js';

export class PetsitterService {
  constructor(petsitterRepository) {
    this.petsitterRepository = petsitterRepository;
  }

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
}
