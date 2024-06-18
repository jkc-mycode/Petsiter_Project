import { UserRepository } from '../repositories/user.repository.js';
import { createAccessToken } from '../utils/auth.util.js';
import bcrypt from 'bcrypt';

export class AuthService {
  userRepository = new UserRepository();

  //회원가입
  signUp = async (email, password, passwordCheck, nickname) => {
    if (!email || !password || !passwordCheck || !nickname || password !== passwordCheck) {
      throw new Error('입력값을 확인해주세요.');
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    const foundUser = await this.userRepository.findUserByEmail(email);
    if (foundUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser(email, hashedPassword, nickname);

    user.password = undefined;

    return user;
  };

  //로그인
  signIn = async (email, password) => {
    // 입력을 했는지 안했는지 확인하는 것
    if (!email || !password) {
      throw new Error('이메일과 비밀번호를 확인해주세요.');
    }

    // 입력 했어도 이메일 형식에 맞게 입력했는지 확인
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    // 위의 오류를 통과했으면 그 email이 DB에 존재하는지 확인
    const foundUser = await this.userRepository.findUserByEmail(email);

    // 입력한 비밀번호와 암호화된 비밀번호가 같은지 비교한다.
    // bcrypt.compare가 password에 들어올 값을 만약 암호화 한다면 ~ 이라고 가상의 암호를 작성
    // 그 암호와 foundUser.password가 일치하면 isPasswordMatched가 된다. 그리고 그 값은 true
   
    const isPasswordMatched = await bcrypt.compare(password, foundUser.password);

    // isPasswordMatched가 존재하지 않다면 즉 true가 아니라면! 에러를 보낸다.
    if (!isPasswordMatched) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // 입력한 email을 기준으로 DB에 없을 때 나오는 값
    if (!foundUser) {
      throw new Error('유저를 찾을 수 없습니다.');
    }

    const accesstoken = createAccessToken(foundUser.userId);

    const { password: _, ...restfoundUser } = foundUser;
    return { ...restfoundUser, accesstoken: `Bearer ${accesstoken}` };
  };
}
