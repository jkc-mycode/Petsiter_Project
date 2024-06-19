import { PETSITTER_CONSTANT } from '../constants/petsitter.constant.js';
import { PETSITTER_MESSAGE } from '../constants/petsitter.message.constant.js';

export class PetsitterController {
  constructor(petsitterService) {
    this.petsitterService = petsitterService;
  }

  // 펫시터 목록 조회
  getPetsitterList = async (req, res, next) => {
    try {
      // 정렬 조건을 req.query에서 가져옴
      let rateSort = req.query.rate?.toLowerCase();
      let priceSort = req.query.price?.toLowerCase();

      let orderByCondition = {};

      if (rateSort) {
        // 인기 순 쿼리로 들어온 데이터가 desc, asc 둘다 아닐때 고정값 설정
        if (
          rateSort !== PETSITTER_CONSTANT.SORT_TYPE.DESC &&
          rateSort !== PETSITTER_CONSTANT.SORT_TYPE.ASC
        ) {
          rateSort = PETSITTER_CONSTANT.SORT_TYPE.DESC;
        }
        orderByCondition[PETSITTER_CONSTANT.ORDERBY.TOTAL_RATE] = rateSort;
      } else if (priceSort) {
        // 가격 순 쿼리로 들어온 데이터가 desc, asc 둘다 아닐때 고정값 설정
        if (
          priceSort !== PETSITTER_CONSTANT.SORT_TYPE.DESC &&
          priceSort !== PETSITTER_CONSTANT.SORT_TYPE.ASC
        ) {
          priceSort = PETSITTER_CONSTANT.SORT_TYPE.DESC;
        }
        orderByCondition[PETSITTER_CONSTANT.ORDERBY.PRICE] = priceSort;
      } else {
        // 인기순, 가격순도 없으면 그냥 시간순으로 내림차순
        orderByCondition[PETSITTER_CONSTANT.ORDERBY.CREATED_AT] = PETSITTER_CONSTANT.SORT_TYPE.DESC;
      }

      // 펫시터 목록 조회
      const petsitters = await this.petsitterService.getPetsitterList(orderByCondition);

      return res.status(200).json({
        status: 200,
        message: PETSITTER_MESSAGE.PETSITTER.LIST.SUCCEED,
        data: { petsitters },
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 상세 조회
  getPetsitterDetail = async (req, res, next) => {
    try {
      const { petsitterId } = req.params;

      const petsitter = await this.petsitterService.getPetsitterDetail(+petsitterId);

      return res.status(200).json({
        status: 200,
        message: PETSITTER_MESSAGE.PETSITTER.DETAIL.SUCCEED,
        data: { petsitter },
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 검색 기능
  searchPetsitter = async (req, res, next) => {
    try {
      // 펫시터를 검색하기 위한 쿼리를 가져옴
      const { name, region, price, career } = req.query;
      let petsitters;

      // 각 쿼리로 검색할 때의 where 조건절
      if (name) {
        petsitters = await this.petsitterService.searchPetsitter({ petsitterName: name });
      } else if (region) {
        petsitters = await this.petsitterService.searchPetsitter({ region });
      } else if (price) {
        petsitters = await this.petsitterService.searchPetsitter({ price: { lte: +price } });
      } else if (career) {
        petsitters = await this.petsitterService.searchPetsitter({
          petsitterCareer: { gte: +career },
        });
      } else {
        petsitters = await this.petsitterService.searchPetsitter({});
      }

      return res.status(200).json({
        status: 200,
        message: PETSITTER_MESSAGE.PETSITTER.SEARCH.SUCCEED,
        data: { petsitters },
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 본인정보 조회
  getPetsitterById = async (req, res, next) => {
    try {
      const petsitterId = req.petsitter.petsitterId;

      const petsitter = await this.petsitterService.getPetsitterById(petsitterId);

      return res.status(200).json({
        status: 200,
        message: PETSITTER_MESSAGE.PETSITTER.MY_INFO.SUCCEED,
        data: petsitter,
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 정보 수정
  updatePetsitter = async (req, res, next) => {
    try {
      const {
        petsitterName,
        petsitterCareer,
        petsitterProfileImage,
        title,
        content,
        region,
        price,
      } = req.body;

      const images = req.files;

      // 펫시터 ID를 가져옴
      const { petsitterId } = req.petsitter;

      // 펫시터 정보 수정
      const updatedPetsitter = await this.petsitterService.updatePetsitter(
        petsitterId,
        petsitterName,
        +petsitterCareer,
        petsitterProfileImage,
        title,
        content,
        region,
        +price,
        images,
        req.petsitter
      );

      return res.status(200).json({
        status: 200,
        message: PETSITTER_MESSAGE.PETSITTER.UPDATE.SUCCEED,
        data: { updatedPetsitter },
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 예약 현황 조회 API
  getPetsitterReservationList = async (req, res, next) => {
    try {
      const { petsitterId } = req.petsitter;

      const reservations = await this.petsitterService.getPetsitterReservationList(petsitterId);

      return res.status(200).json({
        status: 200,
        message: PETSITTER_MESSAGE.RESERVATION.LIST.SUCCEED,
        data: { reservations },
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 예약 상태 변경 API
  updatePetsitterReservation = async (req, res, next) => {
    try {
      const { petsitterId } = req.petsitter;
      const { reservationId, reservationStatus } = req.body;

      const updatedReservation = await this.petsitterService.updatePetsitterReservation(
        petsitterId,
        reservationId,
        reservationStatus
      );

      return res.status(200).json({
        status: 200,
        message: PETSITTER_MESSAGE.RESERVATION.UPDATE_STATUS.SUCCEED,
        data: { updatedReservation },
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 자격증 추가 API
  createCertificate = async (req, res, next) => {
    try {
      console.log();
      const { certificateName, certificateIssuer, certificateDate } = req.body;
      const image = req.file;
      const { petsitterId } = req.petsitter;

      const certificate = await this.petsitterService.createCertificate(
        +petsitterId,
        certificateName,
        certificateIssuer,
        certificateDate,
        image,
        req.petsitter
      );

      return res.status(200).json({
        status: 200,
        message: '자격증 등록에 성공했습니다.',
        data: { certificate },
      });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 자격증 조회 API
  getCertificate = async (req, res, next) => {
    try {
      console.log();
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 자격증 수정 API
  updateCertificate = async (req, res, next) => {
    try {
      console.log();
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 자격증 삭제 API
  deleteCertificate = async (req, res, next) => {
    try {
      console.log();
    } catch (err) {
      next(err);
    }
  };
}
