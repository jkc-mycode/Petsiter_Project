import { ERROR_CONSTANT } from '../constants/error.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { multerErrorMessages } from '../constants/multer-error.constant.js';

export default (err, req, res, next) => {
  console.error(err);

  // multer에서 발생생한 에러 처리
  if (err.name === 'MulterError') {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ status: HTTP_STATUS.BAD_REQUEST, message: multerErrorMessages[err.code] });
  }

  // joi에서 발생한 에러 처리
  if (err.isJoi) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ status: HTTP_STATUS.BAD_REQUEST, message: err.details[0].message });
  }

  // isJoi로 필터링되지 못한 에러 처리
  if (err.name === ERROR_CONSTANT.NAME.JOI) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ status: HTTP_STATUS.BAD_REQUEST, message: err.message });
  }

  // HttpError 클래스의 에러 처리
  if (err.status && err.message) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  // 그 밖의 예상치 못한 에러 처리
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: MESSAGES.AUTH.COMMON.INTERNAL_SERVER_ERROR,
  });
};
