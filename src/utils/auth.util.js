import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY } from '../constants/env.constant.js';

function createAccessToken(id) {
  // <- 여기 id가 어디서 받는거지?????????? 이거 쓰는 곳의 함수의 id값
  const accessToken = jwt.sign(
    { id: id }, // JWT 데이터 // 여기가 페이로드 넣는 곳.
    ACCESS_TOKEN_SECRET_KEY, // Access Token의 비밀 키
    { expiresIn: '12h' } // Access Token이 12시간 뒤에 만료되도록 설정합니다.
  );

  return accessToken;
}

export { createAccessToken };
