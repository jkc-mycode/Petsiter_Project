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
}
