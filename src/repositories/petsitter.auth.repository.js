export class PetsitterAuthRepository {
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

  // email를 통해 펫시터 찾기(회원가입 시 중복되는 이메일이 있는지 필요함.)
  findPetsitterByEmail = async (email) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: {
        email,
      },
    });
    return petsitter;
  };

  createRefreshToken = async (petsitterId, petsitterRefreshToken) => {
    return this.prisma.petsitterRefreshToken.upsert({
      where: {
        petsitterId: petsitterId,
      },
      update: {
        petsitterRefreshToken: petsitterRefreshToken,
      },
      create: {
        petsitterId: petsitterId,
        petsitterRefreshToken: petsitterRefreshToken,
      },
    });
  };

  SignoutPetsitter = async (petsitterId) => {
    return this.prisma.petsitterRefreshToken.update({
      where: { petsitterId },
      data: {
        petsitterRefreshToken: null,
      },
    });
  };
}
