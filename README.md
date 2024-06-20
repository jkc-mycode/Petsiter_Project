# 🖥️ Team SuperNova의 Node.js 백오피스 프로젝트

![썸네일](./imgs/thumbnail.png)

## 프로젝트 소개

- 프로젝트 이름 : 둥근 마켓
- 내용 : 현재 서비스 중인 “당근 마켓” 사이트를 오마주 하여 뉴스피드 프로젝트
- 구분 : 팀 프로젝트
- GitHub : https://github.com/jkc-mycode/Petsitter_Project
- 시연 영상 : 
- 배포 : 

<br>

## 팀원 구성

- 팀장 : 김정찬 [@jkc-mycode](https://github.com/jkc-mycode)
- 팀원 : 안지윤 [@komiharuu](https://github.com/komiharuu)
- 팀원 : 유승엽 [@seungyeopyoo](https://github.com/seungyeopyoo)
- 팀원 : 송사무엘 [@SaintSSong](https://github.com/SaintSSong)
- 팀원 : 엄혜인 [@Eomhyein](https://github.com/Eomhyein)

<br>

## 1. 개발 기간

- 2024.06.17 ~ 2024.06.20

<br>

## 2. 개발 환경

- 운영체제 : Window/Mac
- FrontEnd : X
- BackEnd : Node.js, Express, MySQL(Prisma)
- Tool : Visual Studio Code, Insomnia, DBeaver, AWS/S3
- Publish : PM2, AWS/RDS, AWS/EC2, AWS/load balancer

<br>

## 3. 역할 분배

- **김정찬**
  - 펫서터 조회(검색) 구현
  - 펫시터 목록 조회 구현
  - 펫시터 상세 조회 구현
  - 펫시터 정보 수정 구현
  - 펫시터 예약 현황 조회 구현
  - 펫시터 예약 상태 변경 구현
  - 펫시터 자격증 추가, 조회, 수정, 삭제 구현
  - README 작성
- **안지윤**
  - 펫시터 회원가입 구현
  - 펫시터 로그인 / 로그아웃 구현
  - 펫시터 토큰 재발급 구현
  - 사용자 본인 정보 조회 구현
  - 사용자 본인 정보 수정 구현
  - 발표 PPT 제작
- **유승엽**
  - 사용자 예약 생성 구현
  - 사용자 예약 목록 조회 구현
  - 사용자 예약 상세 조회 구현
  - 사용자 예약 수정 구현
  - 사용자 예약 삭제 구현
  - 시연 영상 촬영
- **송사무엘**
  - 사용자 회원가입 구현
  - 사용자 로그인 / 로그아웃 구현
  - 사용자 토큰 재발급 구현
  - 발표 진행
- **엄혜인**
  - 사용자 리뷰 생성 구현
  - 사용자 리뷰 조회 구현
  - 사용자 리뷰 수정 구현
  - 사용자 리뷰 삭제 구현

<br>

## 4. API 명세서 및 ERD, 와이어 프레임

- API 명세서 : 
- ERD : https://drawsql.app/teams/nodejs-express/diagrams/-3

![와이어프레임](./imgs/wireframe.jpg)

<br>

## 5. 주요 기능 및 설명

### 5-1. 사용자 회원가입 API

- 

- 

![회원가입 이메일 인증](./imgs/2-sign-up-email.png)

<br>

### 5-2. 로그인 API

- 

- 

![회원가입 API](./imgs/1-sign-up.png)

<br>

### 5-3. 로그아웃 API

- 

![로그인 API](./imgs/3-sign-in.png)

<br>

### 5-4. 토큰 재발급 API

- 

![카카오 소셜 로그인 API](./imgs/4-kakao-social.png)

<br>

### 5-5. 펫시터 회원가입 API

- 

![네이버 소셜 로그인 API](./imgs/5-naver-social.png)

<br>

### 5-6. 펫시터 로그인 API

- 

![토큰 재발급 API](./imgs/8-token-reissue.png)

<br>

### 5-7. 펫시터 로그아웃 API

- 

![로그 아웃 API](./imgs/9-sign-out.png)

<br>

### 5-8. 펫시터 토큰 재발급 API

- 로그인한 사용자의 정보를 조회하는 API입니다.

- 

![사용자 조회 API](./imgs/6-user-information.png)

<br>

### 5-9. 사용자 본인 정보 조회 API

- 

![사용자 정보 수정 API](./imgs/7-user-update.png)

<br>

### 5-10. 사용자 본인 정보 수정 API

- 판매할 상품의 정보를 입력 받아 게시물을 생성하는 API입니다.

- 

![게시물 생성 API](./imgs/12-trade-create.png)

<br>

### 5-11. 펫시터 조회(검색) API

- 

![게시물 목록조회 - follow API](./imgs/16-trade-list-follow.png)

<br>

### 5-12. 펫시터 목록 조회 API

- 

![게시물 상세 조회 API](./imgs/17-trade-detail.png)

<br>

### 5-13. 펫시터 상세 조회 API

- 

![게시물 수정 API](./imgs/18-trade-update.png)

<br>

### 5-14. 펫시터 수정 API

- 

![게시물 삭제 API](./imgs/19-trade-delete.png)

<br>

### 5-15. 펫시터 예약 현황 조회 API

- 

![게시물 좋아요 취소 API](./imgs/21-trade-unlike.png)

<br>

### 5-16. 펫시터 예약 상태 변경 API

- 

![댓글 생성 API](./imgs/22-comment-create.png)

<br>

### 5-17. 펫시터 자격증 생성 API

- 

![댓글 조회 API](./imgs/24-comment-list.png)

<br>

### 5-18. 댓글 수정 API

- 

![댓글 수정 API](./imgs/23-comment-update.png)

<br>

### 5-19. 댓글 삭제 API

- 

![댓글 삭제 API](./imgs/25-comment-delete.png)

<br>

### 5-20. 댓글 좋아요 API

- 

![댓글 좋아요 API](./imgs/26-comment-like.png)

<br>

### 5-21. 상품 판매/구매 완료 API

- 

![거래 내역 생성 API](./imgs/28-make-history.png)

<br>

### 5-22. 상품 구매/판매 내역 조회 API

- 

![판매 내역 조회 API](./imgs/30-sell-history.png)

<br>

### 5-23. 팔로우 API

- 

![팔로우 API](./imgs/10-follow.png)

<br>

## 6. 어려웠던 점

### 6-1. N:M 관계 vs 1:N 관계의 차이 (김정찬)

- 

<br>

### 6-2. 소셜 로그인과 기존 인증방식의 호환 (채유일)

- 

<br>

### 6-3. Prisma 작동 로직의 이해 (구남욱)

- 

<br>

### 6-4. 계획, 설계의 부족과 테스트 여러움 (복광수)

- 