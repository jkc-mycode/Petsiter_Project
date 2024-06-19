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
}

