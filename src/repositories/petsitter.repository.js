export class PetsitterRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 펫시터 생성
  createPetsitter = async ({
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
    const data = await this.prisma.petsitter.create({
      data: {
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
      },
    });
    return data;
  };

  // ID를 통해 펫시터 찾기(본인정보 조회)
  findPetsitterById = async (petsitterId) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: {
        petsitterId: petsitterId,
      },
      select: {
        petsitterId: true,
        email: true,
        password: true,
        petsitterName: true,
        petsitterCareer: true,
        petsitterProfileImage: true,
        content: true,
        region: true,
        price: true,
        totalRate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return petsitter;
  };

  // email를 통해 펫시터 찾기(회원가입 시 중복되는 이메일이 있는지 필요함.)
  findPetsitterByEmail = async (email) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: {
        email,
      },
    });
    return petsitter;
  };






  // 펫시터 목록 조회
  getPetsitterList = async (orderByCondition) => {
    const petsitters = await this.prisma.petsitter.findMany({
      include: { houseImage: true, review: true },
      orderBy: orderByCondition ? orderByCondition : { createAt: 'desc' },
    });

    console.log(petsitters);

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
    price
  ) => {
    const updatedPetsitter = await this.prisma.petsitter.update({
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

    return updatedPetsitter;
  };

  // 펫시터 예약 현황 조회 API
  getPetsitterReservationList = async (petsitterId) => {
    const petsitter = await this.prisma.petsitter.findFirst({
      where: { petsitterId },
      // 중첩 include를 통해서 사용자 정보를 가져옴
      include: { reservation: { include: { user: true } } },
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
      orderBy: { createdAt: 'desc' },
    });

    return petsitters;
  };
}
