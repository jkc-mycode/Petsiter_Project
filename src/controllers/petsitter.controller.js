export class PetsitterController {
  constructor(petsitterService) {
    this.petsitterService = petsitterService;
  }

  // 펫시터 회원가입
  signUp = async (req, res, next) => {
    const {
      email,
      password,
      petsitterName,
      petsitterCareer,
      title,
      content,
      region,
      price,
      totalRate,
    } = req.body;
    try {
      const petsitter = await this.petsitterService.petsitterSignUp({
        email,
        password,
        petsitterName,
        petsitterCareer,
        title,
        content,
        region,
        price,
        totalRate,
      });
      return res.status(201).json({status: 200, message: '회원가입이 완료되었습니다.', petsitter });
    } catch (err) {
      next(err);
    }
  };

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
        orderByCondition['total_rate'] = rateSort;
      }

      if (priceSort) {
        // 가격 순 쿼리로 들어온 데이터가 desc, asc 둘다 아닐때 고정값 설정
        if (priceSort !== 'desc' && priceSort !== 'asc') {
          priceSort = 'desc';
        }
        orderByCondition['price'] = priceSort;
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

      const { petsitterId } = req.params;

      const updatedPetsitter = await this.petsitterService.updatePetsitter(
        +petsitterId,
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

  // // 펫시터 본인정보 조회
  getPetsitterById = async (req, res, next) => {
    try {
    
      const petsitterId = 4
      // 더미데이터
      const petsitter = await this.petsitterService.getPetsitterById(petsitterId);

      return res
        .status(200)
        .json({ status: 200, message: '본인 정보 조회에 성공했습니다.', data: petsitter });
    } catch (err) {
      next(err);
    }
  };

  // 펫시터 예약 현황 조회 API
  getPetsitterReservationList = async (req, res, next) => {
    try {
      const { petsitterId } = req.params;

      const reservations = await this.petsitterService.getPetsitterReservationList(+petsitterId);

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
      const { petsitterId } = req.params;
      const { reservationId, reservationStatus } = req.body;

      const updatedReservation = await this.petsitterService.updatePetsitterReservation(
        +petsitterId,
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
