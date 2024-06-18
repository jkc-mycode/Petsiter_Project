export class PetsitterRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 펫시터 목록 조회
  getPetsitterList = async (orderByCondition) => {
    const petsitters = await this.prisma.petsitter.findMany({
      include: { certificate: true, houseImage: true },
      orderBy: orderByCondition ? orderByCondition : { createAt: 'desc' },
    });

    console.log(petsitters);

    return petsitters;
  };

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
}
