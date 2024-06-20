export const RESERVATION_MESSAGES = {
  RESERVATION: {
    COMMON: {
      RESERVATION_ID: {
        BASE: '예약 ID는 정수입니다.',
        REQUIRED: '예약 ID를 입력해 주세요.',
      },
      RESERVATION_STATUS: {
        BASE: '예약 상태는 문자열입니다.',
        REQUIRED: '예약 상태를 입력해 주세요.',
        ONLY: '예약 상태는 [AWAIT, ACCEPT, CANCEL] 중 하나여야 합니다.',
      },
      PETSITTER_ID: {
        BASE: '펫시터 ID는 숫자여야 합니다.',
        REQUIRED: '펫시터 ID는 필수값입니다.',
      },
      RESERVATION_DATE: {
        BASE: '예약 날짜는 유효한 날짜여야 합니다.', //프론트에서 관리해주시면 될듯
        REQUIRED: '예약 날짜는 필수값입니다.',
      },
      ANIMAL_TYPE: {
        BASE: '동물 타입은 문자열이어야 합니다.',
        ONLY: '동물 타입은 "CAT" 또는 "DOG"여야 합니다.',
        REQUIRED: '동물 타입은 필수값입니다.',
      },
      HOUR: {
        BASE: '맡기실 시간은 숫자여야 합니다.',
        REQUIRED: '맡기실 시간은 필수값입니다.',
      },
      ETC: {
        BASE: '전달사항은 문자열이어야 합니다.',
      },
      NOT_FOUND: '해당 예약이 존재하지 않습니다.',
      UNAUTHORIZED: '예약 수정 권한이 없습니다.',
    },
    LIST: {
      SUCCEED: '예약 현황 조회에 성공했습니다.',
    },
    UPDATE_STATUS: {
      SUCCEED: '예약 상태 변경에 성공했습니다.',
    },
  },
};
