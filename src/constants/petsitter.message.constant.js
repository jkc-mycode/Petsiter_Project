export const PETSITTER_MESSAGE = {
  PETSITTER: {
    COMMON: {
      PETSITTER_NAME: {
        BASE: '펫시터 이름은 문자열입니다.',
      },
      PETSITTER_CAREER: {
        BASE: '펫시터 경력은 정수입니다.',
      },
      PETSITTER_PROFILE_IMAGE: {
        BASE: '펫시터 프로필 사진은 문자열입니다.',
      },
      TITLE: {
        BASE: '소개 제목은 문자열입니다.',
      },
      CONTENT: {
        BASE: '소개 글은 문자열입니다.',
      },
      REGION: {
        BASE: '지역명은 문자열입니다.',
      },
      PRICE: {
        BASE: '가격은 정수입니다.',
      },
      NOT_FOUND: '해당 펫시터가 존재하지 않습니다.',
    },
    LIST: {
      SUCCEED: '펫시터 목록 조회에 성공했습니다.',
    },
    DETAIL: {
      SUCCEED: '펫시터 상세 조회에 성공했습니다.',
    },
    SEARCH: {
      SUCCEED: '펫시터 검색에 성공했습니다.',
    },
    MY_INFO: {
      SUCCEED: '본인 정보 조회에 성공했습니다.',
    },
    UPDATE: {
      SUCCEED: '펫시터 수정에 성공했습니다.',
    },
  },
  RESERVATION: {
    COMMON: {
      RESERVATION_ID: {
        BASE: '예약 ID는 정수입니다.',
        REQUIRED: '예약 ID를 입력해 주세요.',
      },
      RESERVATION_STATUS: {
        BASE: '예약 상테는 문자열입니다.',
        REQUIRED: '예약 상태를 입력해 주세요.',
        ONLY: '예약 상태는 [AWAIT, ACCEPT, CANCEL] 중 하나여야 합니다.',
      },
      NOT_FOUND: '해당 예약이 존재하지 않습니다.',
      UNAUTHORIZED: '예약 수정 권한이 없습니다.',
    },
    LIST: {
      SUCCEED: '예약 현황 조회에 성공했습니다.',
    },
    UPDATE_STATUS: {
      SUCCEED: '예상 상태 변경에 성공했습니다.',
    },
  },
};
