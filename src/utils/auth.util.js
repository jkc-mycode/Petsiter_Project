import jwt from 'jsonwebtoken';
import { USER_ACCESS_TOKEN_SECRET_KEY } from '../constants/env.constant.js';
import { USER_REFRESH_TOKEN_SECRET_KEY } from '../constants/env.constant.js';

function createAccessToken(id) {
  // <- 여기 id가 어디서 받는거지?????????? 이거 쓰는 곳의 함수의 id값
  const accessToken = jwt.sign(
    { id: id }, // JWT 데이터 // 여기가 페이로드 이면서 데이터 넣는 곳.
    // { id(key): foundUser.userId(value)}
    USER_ACCESS_TOKEN_SECRET_KEY, // Access Token의 비밀 키
    { expiresIn: '1h' } // Access Token이 12시간 뒤에 만료되도록 설정합니다.
  );

  return accessToken;
}

export { createAccessToken };

/** ---------------------------------------------------------------------------- */

function createRefreshToken(id) {
  // <- 여기 id가 어디서 받는거지?????????? 이거 쓰는 곳의 함수의 id값
  const refreshToken = jwt.sign(
    { id: id }, // JWT 데이터 // 여기가 페이로드 이면서 데이터 넣는 곳.
    // { id(key): foundUser.userId(value)}
    USER_REFRESH_TOKEN_SECRET_KEY, // Refresh Token의 비밀 키
    { expiresIn: '7d' } // Refresh Token이 7일 뒤에 만료되도록 설정합니다.
  );

  return refreshToken;
}

export { createRefreshToken };

/**------------------------------------------------------- */
// 예시

/**
 * const accesstoken = createAccessToken(foundUser.userId);
 *            function createAccessToken(id)
 */
// const decodedToken = { id : foundUser.userId,  password : "aaaa4321"}
//                      { key : value }

// console.log(decodedToken.id) = foundUser.userId
// console.log(decodedToken.password) = aaaa4321

// const a = { "이름" : "사무엘", "나이" : 31, }

// console.log(a.이름) = 사무엘
// console.log(a.나이) = 31
