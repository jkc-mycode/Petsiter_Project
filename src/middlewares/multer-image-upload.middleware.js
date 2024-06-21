import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import aws from '@aws-sdk/client-s3';
import { HttpError } from '../errors/http.error.js';
import { PETSITTERMESSAGES } from '../constants/petsitter.auth.message.constant.js';

const s3 = new aws.S3({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

// multer 객체 생성
export const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const userId = req.petsitter.petsitterId;

      // 오늘 날짜 구하기
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const currentDate = today.getDate();
      const date = `${currentYear}-${currentMonth}-${currentDate}`;

      // 임의번호 생성
      let randomNumber = '';
      for (let i = 0; i < 8; i++) {
        randomNumber += String(Math.floor(Math.random() * 10));
      }

      // 확장자 검사
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('확장자 에러'));
      }

      // folder라는 파일 내부에 업로드한 사용자에 따라 임의의 파일명으로 저장
      callback(null, `test/${userId}_${date}_${randomNumber}`);
    },
    // acl 권한 설정
    acl: 'public-read-write',
  }),
  // 이미지 용량 제한 (5MB)
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// S3 이미지 삭제 함수
export const deleteImage = async (key) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    };

    await s3.deleteObject(params);
  } catch (err) {
    console.log(err);
    throw new HttpError.InternalServerError(PETSITTERMESSAGES.PETSITTER.SERVICE.ERROR);
  }
};
