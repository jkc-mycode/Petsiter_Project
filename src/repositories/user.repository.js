import { prisma } from '../utils/prisma.util.js';

export class UserRepository {
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

  로그인;
  findUserByEmail = async (email) => {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return foundUser;
  };

  //accessToken 확인용
  findUserById = async (userId) => {
    const foundUser = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    return foundUser;
  };

  // 회원정보 수정

  UpdateUser = async (email, password, nickname) => {
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
