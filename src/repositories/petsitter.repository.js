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

  // 이메일을 통해 펫시터 찾기
  findPetsitterByEmail = async (email) => {
    const data = await this.prisma.petsitter.findUnique({
      where: {
        email: email,
      },
    });
    return data;
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
      include: { certificate: true, houseImage: true, review: true },
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
}
