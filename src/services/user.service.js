import bcrypt from 'bcrypt';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  //   사용자 본인정보 수정 API
  UpdateUser = async (userId, email, password, nickname, role) => {
    try {
      const user = await this.userRepository.findOneUserById(userId);
      if (!user) {
        throw new HttpError.NotFound('MESSAGES.USER.NOT_FOUND');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      // 저장소(Repository)에게 데이터 수정을 요청합니다.
      await this.userRepository.UpdateUser(userId, email, hashedPassword, nickname, role);

      // 변경된 데이터를 조회합니다.
      const updateuser = await this.userRepository.UpdateUser(userId);

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
    } catch (err) {
      console.error(err);
      throw new HttpError.InternalServerError(MESSAGES.SERVER.ERROR);
    }
  };

  updateMypage = async (email, password, nickname) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.userRepository.updateMypage(email, hashedPassword, nickname);

      // 변경된 데이터를 조회합니다.
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
    } catch (err) {
      console.error(err);
      throw new HttpError.InternalServerError(MESSAGES.SERVER.ERROR);
    }
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
