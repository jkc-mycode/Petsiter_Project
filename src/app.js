import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import apiRouter from './routers/index.js';

dotenv.config();
const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cookieParser());

// healthy 체크용 주소
app.get('/', (req, res) => {
  return res.status(200).json({ message: '테스트' });
});

app.use('/api', [apiRouter]);

app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT, '포트로 서버가 열렸어요!');
});
