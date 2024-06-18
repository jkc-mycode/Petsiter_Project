import express from 'express';

const apiRouter = express.Router();

// 테스트용 라우터 (나중에 지울 예정)
apiRouter.get('/', (req, res) => {
  return res.status(200).json({ message: 'index.js 테스트' });
});

export default apiRouter;
