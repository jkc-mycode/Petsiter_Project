import { AuthService } from '../services/auth.service.js';

export class AuthController {
  // calss AuthService속의 데이터들을 가져 올 것이다.
  authService = new AuthService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordCheck, nickname } = req.body;

      const createUser = await this.authService.signUp(email, password, passwordCheck, nickname);

      return res.status(201).json({ data: createUser });
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const logInAuth = await this.authService.signIn(email, password);

      return res.status(201).json({ data: logInAuth });
    } catch (err) {
      next(err);
    }
  };

  // 토큰 재발급
  token = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const createToken = await this.authService.createToken(userId);

      // json({ createToken })에 access와 refresh가 같이 담겨져 있어야함.
      res.status(200).json({ message: '토큰 재발급에 성공하였습니다.', createToken });
    } catch (err) {
      next(err);
    }
  };

  // 로그아웃
  signOut = async (req, res, next) => {
    try {
      // refresh로 받은 유저 정보를 가져온다.
      const { userId } = req.user;

      // 로그 아웃 할 유저의 userId 기준으로 찾아 들어간다.
      const logOut = await this.authService.findOutUserId(userId);

      // findOutUserId 메스드 값이 userId이 존재하면 무조건 null 값으로 변경하는 것이니까 그대로 간다.

      res.status(200).json({ logOut });
    } catch (err) {
      next(err);
    }
  };
}

