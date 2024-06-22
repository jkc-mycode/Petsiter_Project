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

  // 리프레시 토큰 생성
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

  // 토큰 재발급시 펫시터 id 조회용
  getRefreshToken = async (petsitterId) => {
    const refreshToken = await this.prisma.petsitterRefreshToken.findUnique({
      where: {
        petsitterId: parseInt(petsitterId),
      },
      select: {
        petsitterRefreshToken: true,
      },
    });
    return refreshToken;
  };

  // 펫시터 로그아웃
  signoutPetsitter = async (petsitterId) => {
    return this.prisma.petsitterRefreshToken.update({
      where: { petsitterId },
      data: {
        petsitterRefreshToken: null,
      },
    });
  };
}
