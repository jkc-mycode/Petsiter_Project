import { MESSAGES } from "../constants/message.constant.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { HttpError } from '../errors/http.error.js'; 
export class UserController {
constructor(userService) {
    this.userService = userService;
  }


// 본인 정보 수정

UpdateUser =  async (req, res, next) => {
try{
const { email, password, passwordConfirm, nickname } = req.body;

// 수정 시에 비밀번호를 한번 더 입력받는 과정이 필요합니다. 만약 두 비밀번호가 다르면 에러 메시지를 전송합니다.
if (password !== passwordConfirm) {
  throw HttpError.Conflict(MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MATCHED_WITH_PASSWORD);
}




const updateduser = await this.userService.UpdateUser(
  email, password, nickname 
);

return res.status(200).json({status:HTTP_STATUS.OK,  message:MESSAGES.USERS.UPDATE.SUCCEED, data: updateduser });
    } catch (err) {
      next(err);
    }
  };



  // 사용자 본인정보 조회
  getUserById = async (req, res, next) => {
    try {

      const userId =  req.user.userId;
      const user = await this.userService.getUserById(userId);
      
      return res.status(200).json({status:HTTP_STATUS.OK, message:MESSAGES.USERS.READ_ME.SUCCEED, data: user});
    } catch (err) {
      next(err);
    }
  };

}
