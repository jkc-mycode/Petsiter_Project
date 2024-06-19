import { HttpError } from '../errors/http.error.js';

import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { PETSITTERMESSAGES } from "../constants/petsitter.message.constant.js";


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
        if (rateSort !== 'desc' && rateSort !== 'asc') {
          rateSort = 'desc';
        }
        orderByCondition['totalRate'] = rateSort;
      } else if (priceSort) {
        // 가격 순 쿼리로 들어온 데이터가 desc, asc 둘다 아닐때 고정값 설정
        if (priceSort !== 'desc' && priceSort !== 'asc') {
          priceSort = 'desc';
        }
        orderByCondition['price'] = priceSort;
      } else {
        // 인기순, 가격순도 없으면 그냥 시간순으로 내림차순
        orderByCondition['createdAt'] = 'desc';
      }

      // 펫시터 목록 조회
      const petsitters = await this.petsitterService.getPetsitterList(orderByCondition);

      return res
        .status(200)
        .json({ status: 200, message: '펫시터 목록 조회에 성공했습니다.', data: { petsitters } });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 상세 조회
  getPetsitterDetail = async (req, res, next) => {
    try {
      const { petsitterId } = req.params;

      const petsitter = await this.petsitterService.getPetsitterDetail(+petsitterId);

      return res
        .status(200)
        .json({ status: 200, message: '펫시터 상세 조회에 성공했습니다.', data: { petsitter } });
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

      return res
        .status(200)
        .json({ status: 200, message: '펫시터 검색에 성공했습니다.', data: { petsitters } });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 본인정보 조회
  getPetsitterById = async (req, res, next) => {
    try {
      const petsitterId = req.petsitter.petsitterId;

      const petsitter = await this.petsitterService.getPetsitterById(petsitterId);

      return res
        .status(200)
        .json({ status: 200, message: '본인 정보 조회에 성공했습니다.', data: petsitter });
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

      // 펫시터 ID를 가져옴
      const { petsitterId } = req.petsitter;

      // 펫시터 정보 수정
      const updatedPetsitter = await this.petsitterService.updatePetsitter(
        petsitterId,
        petsitterName,
        petsitterCareer,
        petsitterProfileImage,
        title,
        content,
        region,
        price
      );

      return res
        .status(200)
        .json({ status: 200, message: '펫시터 수정에 성공했습니다.', data: { updatedPetsitter } });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 예약 현황 조회 API
  getPetsitterReservationList = async (req, res, next) => {
    try {
      const { petsitterId } = req.petsitter;

      const reservations = await this.petsitterService.getPetsitterReservationList(petsitterId);

      return res
        .status(200)
        .json({ status: 200, message: '예약 현황 조회에 성공했습니다.', data: { reservations } });
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
        message: '예상 상태 변경에 성공했습니다.',
        data: { updatedReservation },
      });
    } catch (err) {
      next(err);
    }
  };
}
