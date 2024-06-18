import express from 'express';
import dotenv from 'dotenv';




dotenv.config();
const app = express();
const SERVER_PORT = process.env.SERVER_PORT

app.use(express.json());



app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT, '포트로 서버가 열렸어요!');
});