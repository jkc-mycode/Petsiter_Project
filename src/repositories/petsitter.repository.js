import { PETSITTER_CONSTANT } from '../constants/petsitter.constant.js';

export class PetsitterRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // decoded 부분에서 디코디드가 있는지 없는지만 확인하고 파인드유니크로 넘어온다.

  // ID를 통해 펫시터 찾기(본인정보 조회 및 미들웨어)
  findPetsitterById = async (petsitterId) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: {
        petsitterId: Number(petsitterId),
      },
      include: { certificate: true, houseImage: true },
    });
    return petsitter;
  };

  // 펫시터 목록 조회
  getPetsitterList = async (orderByCondition) => {
    const petsitters = await this.prisma.petsitter.findMany({
      include: { houseImage: true, review: true },
      orderBy: orderByCondition
        ? orderByCondition
        : { createAt: PETSITTER_CONSTANT.SORT_TYPE.DESC },
    });

    return petsitters;
  };

  // 펫시터 상세 조회
  getPetsitterDetail = async (petsitterId) => {
    const petsitter = await this.prisma.petsitter.findFirst({
      where: { petsitterId },
      include: { certificate: true, houseImage: true, review: true, reservation: true },
    });

    return petsitter;
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
    price,
    images,
    petsitter
  ) => {
    const updatedPetsitter = await this.prisma.$transaction(async (tx) => {
      const updatedData = await tx.petsitter.update({
        where: { petsitterId },
        data: {
          // 입력된 데이터가 있으면 수정하고 없으면 생략
          ...(petsitterName && { petsitterName }),
          ...(petsitterCareer && { petsitterCareer }),
          ...(petsitterProfileImage && { petsitterProfileImage }),
          ...(title && { title }),
          ...(content && { content }),
          ...(region && { region }),
          ...(price && { price }),
        },
      });

      // 비밀번호는 제외하고 반환
      updatedData.password = undefined;

      // 사진이 있는 펫시터 정보
      let houseImage = petsitter.houseImage;

      // 이미지 수정
      if (images.length !== 0) {
        await tx.houseImage.deleteMany({ where: { petsitterId: petsitter.petsitterId } });
        houseImage = await Promise.all(
          images.map(async (image) => {
            return await tx.houseImage.create({
              data: { petsitterId: petsitter.petsitterId, imageUrl: image.location },
            });
          })
        );
      }
      return [updatedData, houseImage];
    });

    return updatedPetsitter;
  };

  // 펫시터 예약 현황 조회 API
  getPetsitterReservationList = async (petsitterId) => {
    const petsitter = await this.prisma.petsitter.findFirst({
      where: { petsitterId },
      // 중첩 include를 통해서 사용자 정보를 가져옴
      include: {
        reservation: {
          include: { user: true },
          orderBy: { createdAt: PETSITTER_CONSTANT.SORT_TYPE.DESC },
        },
      },
    });

    const reservations = petsitter.reservation;

    return reservations;
  };

  // 예약 ID를 통해 예약 정보 조회
  getPetsitterReservation = async (reservationId) => {
    const reservation = await this.prisma.reservation.findFirst({
      where: { reservationId },
    });

    return reservation;
  };

  // 펫시터 예약 상태 변경 API
  updatePetsitterReservation = async (petsitterId, reservationId, reservationStatus) => {
    const updatedReservation = await this.prisma.reservation.update({
      where: { petsitterId, reservationId },
      data: { reservationStatus },
    });

    return updatedReservation;
  };

  // 펫시터 검색 기능
  searchPetsitter = async (whereCondition) => {
    const petsitters = await this.prisma.petsitter.findMany({
      where: whereCondition,
      orderBy: { createdAt: PETSITTER_CONSTANT.SORT_TYPE.DESC },
    });

    return petsitters;
  };

  // 펫시터 자격증 추가
  createCertificate = async (
    petsitterId,
    certificateName,
    certificateIssuer,
    certificateDate,
    image
  ) => {
    const certificate = await this.prisma.certificate.create({
      data: {
        petsitterId,
        imageUrl: image.location,
        certificateName,
        certificateIssuer,
        certificateDate,
      },
    });

    return certificate;
  };

  // 펫시터 자격증 조회
  getCertificates = async (petsitterId) => {
    const certificates = await this.prisma.certificate.findMany({
      where: { petsitterId },
      orderBy: { createdAt: PETSITTER_CONSTANT.SORT_TYPE.DESC },
    });

    return certificates;
  };

  // 펫시터 자격증 수정
  updateCertificate = async (
    certificateId,
    certificateName,
    certificateIssuer,
    certificateDate,
    image
  ) => {
    const imageUrl = image.location;
    const certificate = await this.prisma.certificate.update({
      where: { certificateId },
      data: {
        // 입력된 데이터가 있으면 수정하고 없으면 생략
        ...(certificateName && { certificateName }),
        ...(certificateIssuer && { certificateIssuer }),
        ...(certificateDate && { certificateDate }),
        ...(imageUrl && { imageUrl }),
      },
    });

    return certificate;
  };
}
