import express from 'express';



const app = express();
const PORT = process.env.PORT

app.use(express.json());



app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});