import { PETSITTER_MESSAGE } from '../constants/petsitter.message.constant.js';
import { HttpError } from '../errors/http.error.js'; // 필요한 HttpError 모듈 임포트

export class PetsitterService {
  constructor(petsitterRepository) {
    this.petsitterRepository = petsitterRepository;
  }

  // 펫시터 목록 조회
  getPetsitterList = async (orderByCondition) => {
    // 펫시터 목록 조회
    let petsitters = await this.petsitterRepository.getPetsitterList(orderByCondition);
    if (!petsitters) throw new HttpError.NotFound(PETSITTER_MESSAGE.PETSITTER.COMMON.NOT_FOUND);

    // 펫시터 출력 양식 설정
    petsitters = petsitters.map((petsitter) => {
      return {
        petsitterId: petsitter.petsitterId,
        title: petsitter.title,
        region: petsitter.region,
        totalRate: petsitter.totalRate,
        reviewCount: petsitter.review.length,
        createdAt: petsitter.createdAt,
        updatedAt: petsitter.updatedAt,
        houseImage: petsitter.houseImage,
      };
    });

    return petsitters;
  };

  // // 펫시터 본인정보 조회
  getPetsitterById = async (petsitterId) => {
    const petsitter = await this.petsitterRepository.findPetsitterById(petsitterId);
    if (!petsitter) throw new HttpError.NotFound(PETSITTER_MESSAGE.PETSITTER.COMMON.NOT_FOUND);
    return {
      petsitterId: petsitter.petsitterId,
      email: petsitter.email,
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
  };

  // 펫시터 상세 조회
  getPetsitterDetail = async (petsitterId) => {
    let petsitter = await this.petsitterRepository.getPetsitterDetail(petsitterId);
    if (!petsitter) throw new HttpError.NotFound(PETSITTER_MESSAGE.PETSITTER.COMMON.NOT_FOUND);

    return {
      petsitterId: petsitter.petsitterId,
      petsitterName: petsitter.petsitterName,
      petsitterCareer: petsitter.petsitterCareer,
      petsitterProfileImage: petsitter.petsitterProfileImage,
      title: petsitter.title,
      content: petsitter.content,
      region: petsitter.region,
      totalRate: petsitter.totalRate,
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
    // DB에서 실제로 있는지 확인할 필요 X => 인증 미들웨어에서 인증을 마쳤기 때문에
    // 펫시터 정보 수정
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

    // 비밀번호는 제외하고 반환
    updatedPetsitter.password = undefined;

    return updatedPetsitter;
  };

  // 펫시터 예약 현황 조회 API
  getPetsitterReservationList = async (petsitterId) => {
    let reservations = await this.petsitterRepository.getPetsitterReservationList(petsitterId);

    reservations = reservations.map((reservation) => {
      return {
        reservationId: reservation.reservationId,
        userNickname: reservation.user.nickname,
        reservationDate: reservation.reservationDate,
        reservationStatus: reservation.reservationStatus,
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt,
      };
    });

    return reservations;
  };

  // 펫시터 예약 상태 변경 API
  updatePetsitterReservation = async (petsitterId, reservationId, reservationStatus) => {
    // 예약 ID가 유효한지 확인
    const reservation = await this.petsitterRepository.getPetsitterReservation(reservationId);
    if (!reservation) throw new HttpError.NotFound(PETSITTER_MESSAGE.RESERVATION.COMMON.NOT_FOUND);

    // 예약 데이터의 펫시터와 로그인한 펫시터가 같은지 확인
    if (reservation.petsitterId !== petsitterId)
      throw new HttpError.Unauthorized(PETSITTER_MESSAGE.RESERVATION.COMMON.UNAUTHORIZED);

    let updatedReservation = await this.petsitterRepository.updatePetsitterReservation(
      petsitterId,
      reservationId,
      reservationStatus
    );

    return updatedReservation;
  };

  // 펫시터 검색 기능
  searchPetsitter = async (whereCondition) => {
    const petsitters = await this.petsitterRepository.searchPetsitter(whereCondition);

    return petsitters;
  };
}
