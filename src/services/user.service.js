import bcrypt from 'bcrypt';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  //   사용자 유저정보 수정 API
  updateUser = async (userId, email, password, nickname, role) => {
    const user = await this.userRepository.findOneUserById(userId);
    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USERS.NOT_FOUND);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.updateUser(userId, email, hashedPassword, nickname, role);

    const updateuser = await this.userRepository.updateUser(userId);

    return {
      userId: updateuser.userId,
      email: updateuser.email,
      nickname: updateuser.nickname,
      profileImage: updateuser.profileImage,
      socialId: updateuser.socialId,
      provider: updateuser.provider,
      role: updateuser.role,
      createdAt: updateuser.createdAt,
      updatedAt: updateuser.updatedAt,
    };
  };
  // 본인정보 수정 api
  updateMypage = async (email, password, nickname) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.updateMypage(email, hashedPassword, nickname);

    const updateuser = await this.userRepository.updateMypage(email);

    return {
      userId: updateuser.userId,
      email: updateuser.email,
      nickname: updateuser.nickname,
      profileImage: updateuser.profileImage,
      socialId: updateuser.socialId,
      provider: updateuser.provider,
      role: updateuser.role,
      createdAt: updateuser.createdAt,
      updatedAt: updateuser.updatedAt,
    };
  };

  //사용자 본인정보 조회
  getUserById = async (userId) => {
    // userId 통한 본인정보 검색

    const user = await this.userRepository.findUserById(userId);

    return {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      profileImage: user.profileImage,
      socialId: user.socialId,
      provider: user.provider,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
}
