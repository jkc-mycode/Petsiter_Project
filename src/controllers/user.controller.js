import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { HttpError } from '../errors/http.error.js';
export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // 유저정보 수정

  UpdateUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const roles = req.user.role;
      const { email, password, passwordConfirm, nickname, role } = req.body;

      // 수정 시에 비밀번호를 한번 더 입력받는 과정이 필요합니다. 만약 두 비밀번호가 다르면 에러 메시지를 전송합니다.
      if (password !== passwordConfirm) {
        throw HttpError.Conflict(MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD);
      }

      const updatedUser = await this.userService.UpdateUser(
        userId,
        email,
        password,
        nickname,
        role
      );
      if (roles === 'USER') {
        throw new HttpError.NotFound('접근 권한이 없습니다.');
      }

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.UPDATE.SUCCEED,
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  // 본인 정보 수정

  updateMyPage = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, nickname } = req.body;

      // 수정 시에 비밀번호를 한번 더 입력받는 과정이 필요합니다. 만약 두 비밀번호가 다르면 에러 메시지를 전송합니다.
      if (password !== passwordConfirm) {
        throw HttpError.Conflict(MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD);
      }

      const updateduser = await this.userService.updateMypage(email, password, nickname);

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.UPDATE.SUCCEED,
        data: updateduser,
      });
    } catch (err) {
      next(err);
    }
  };

  // 사용자 본인정보 조회
  getUserById = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const user = await this.userService.getUserById(userId);

      return res
        .status(200)
        .json({ status: HTTP_STATUS.OK, message: MESSAGES.USERS.READ_ME.SUCCEED, data: user });
    } catch (err) {
      next(err);
    }
  };
}
