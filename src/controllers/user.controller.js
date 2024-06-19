

export class UserController {
constructor(userService) {
    this.userService = userService;
  }


// 본인 정보 수정

UpdateUser =  async (req, res, next) => {
try{
const { email, password, passwordConfirm, nickname } = req.body;
if (password !== passwordConfirm) {
  throw new Error('비밀번호가 일치하지 않습니다.');
}




const updateduser = await this.userService.UpdateUser(
  email, password, nickname 
);

return res.status(200).json({status: 200,  message:'수정이 완료되었습니다.', data: updateduser });
    } catch (err) {
      next(err);
    }
  };



  // 사용자 본인정보 조회
  getUserById = async (req, res, next) => {
    try {

      const userId =  req.user.userId;
      const user = await this.userService.getUserById(userId);
      
      return res.status(200).json({status:200, message:'본인 정보 조회에 성공했습니다.', data: user});
    } catch (err) {
      next(err);
    }
  };

}
