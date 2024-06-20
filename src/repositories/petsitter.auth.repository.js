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

  createRefreshToken = async (petsitterId, hashedRefreshToken) => {
    const refreshTokenUser = await this.prisma.petsitterRefreshToken.upsert({
      where: {
        petsitterId: petsitterId,
      },
      update: {
        petsitterRefreshToken: hashedRefreshToken,
      },
      create: {
        petsitterId: petsitterId,
        petsitterRefreshToken: hashedRefreshToken,
      },
    });
    return refreshTokenUser;
  };

  getRefreshToken = async (petsitterId) => {
    try {
      const refreshToken = await this.prisma.petsitterRefreshToken.findFirst({
        where: {
          petsitterId: parseInt(petsitterId),
        },
      });
      return refreshToken;
    } catch (error) {
      new error();
    }
  };

  // 펫시터 로그아웃
  SignoutPetsitter = async (petsitterId) => {
    return this.prisma.petsitterRefreshToken.update({
      where: { petsitterId },
      data: {
        petsitterRefreshToken: null,
      },
    });
  };
}
