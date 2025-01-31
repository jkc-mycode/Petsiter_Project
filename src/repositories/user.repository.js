import { prisma } from '../utils/prisma.util.js';

export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //회원가입
  createUser = async (email, password, nickname) => {
    const createdUser = await prisma.user.create({
      data: {
        email,
        password,
        nickname,
      },
    });

    return createdUser;
  };

  //로그인;
  findUserByEmail = async (email) => {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return foundUser;
  };

  //회원정보 수정시 아이디찾기
  findOneUserById = async (userId) => {
    const foundUser = await prisma.user.findUnique({
      where: {
        userId: +userId,
      },
    });

    return foundUser;
  };

  //accessToken 확인용
  getAccessToken = async (userId) => {
    const foundUser = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    return foundUser;
  };

  getRefreshToken = async (userId) => {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        userId,
      },
    });

    return refreshToken;
  };

  //리프레쉬 토큰
  createRefreshToken = async (userId, hashedRefreshToken) => {
    const refreshTokenUser = await prisma.refreshToken.upsert({
      where: {
        userId: userId,
      },
      update: {
        refreshToken: hashedRefreshToken,
      },
      create: {
        userId: userId,
        refreshToken: hashedRefreshToken,
      },
    });

    return refreshTokenUser;
  };

  // 로그아웃
  logOut = async (userId) => {
    const logOutUser = await prisma.refreshToken.update({
      where: {
        userId,
      },
      data: {
        refreshToken: null,
      },
    });

    return logOutUser;
  };

  // 사용자 본인 정보 조회
  findUserById = async (userId) => {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      include: { reservation: true, refreshToken: true },
    });
    return user;
  };

  // 유저정보

  updateUser = async (userId, email, password, nickname, role) => {
    const updatedUser = await prisma.user.update({
      where: { userId: +userId },
      data: {
        userId: parseInt(userId),
        email,
        password,
        nickname,
        role,
      },
    });
    return updatedUser;
  };

  // 본인정보 수정
  updateMypage = async (email, password, nickname) => {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        email,
        password,
        nickname,
      },
    });

    return updatedUser;
  };
}
