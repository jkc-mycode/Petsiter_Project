import express from 'express';
import petsitterRouter from './petsitter.router.js';
import reservationRouter from './reservation.router.js';
import petsitterRouter from './petsitter.router.js';
const apiRouter = express.Router();

// 테스트용 라우터 (나중에 지울 예정)
apiRouter.get('/', (req, res) => {
  return res.status(200).json({ message: 'index.js 테스트' });
});

// 펫시터 라우터
apiRouter.use('/petsitter', petsitterRouter);
// 예약 라우터를 /reservations 경로에 매핑
apiRouter.use('/reservations', reservationRouter);
apiRouter.use('/petsitter', petsitterRouter);




export default apiRouter;
