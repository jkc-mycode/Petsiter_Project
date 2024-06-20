import { HttpError } from '../errors/http.error.js';

export class AdminService {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  createQna = async (userId, qnaId, title, question, answer) => {
    const createQna = await this.adminRepository.createQna(userId, qnaId, title, question, answer);
    return {
      qnaId: createQna.qnaId,
      userId: createQna.userId,
      title: createQna.title,
      qnaStatus: createQna.qnaStatus,
      question: createQna.question,
      answer: createQna.answer,
      createdAt: createQna.createdAt,
      updatedAt: createQna.updatedAt,
    };
  };

  getAllQna = async (user) => {
    const qnas = await this.adminRepository.findAllQnas();

    qnas.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return qnas.map((qnas) => ({
      qnaId: qnas.qnaId,
      userId: qnas.userId,
      title: qnas.title,
      nickname: qnas.nickname, // 닉네임만 선택
      qnaStatus: qnas.qnaStatus,
      question: qnas.question,
      answer: qnas.answer,
      createdAt: qnas.createdAt,
      updatedAt: qnas.updatedAt,
    }));
  };

  updateQna = async (qnaId, title, question, answer) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    try {
      const resumes = await this.adminRepository.findQnaById(qnaId);
      if (!resumes) {
        throw new HttpError.NotFound('존재하지 않는 게시글입니다.');
      }

      // 저장소(Repository)에게 데이터 수정을 요청합니다.
      await this.adminRepository.updateQna(qnaId, title, question, answer);

      // 변경된 데이터를 조회합니다.
      const qna = await this.adminRepository.updateQna(qnaId);

      return {
        qnaId: qna.qnaId,
        userId: qna.userId,
        title: qna.title,
        qnaStatus: qna.qnaStatus,
        question: qna.question,
        answer: qna.answer,
        createdAt: qna.createdAt,
        updatedAt: qna.updatedAt,
      };
    } catch (err) {
      console.error(err);
      throw new HttpError.InternalServerError('서비스 오류');
    }
  };

  deleteQna = async (qnaId) => {
    try {
      // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
      const qna = await this.adminRepository.findQnaById(qnaId);

      if (!qna) {
        throw new HttpError.NotFound('존재하지 않는 게시글입니다.');
      }

      // 이력서 삭제 요청
      await this.adminRepository.deleteQna(qnaId);

      return {
        qnaId: qna.qnaId,
      };
    } catch (err) {
      console.error(err);
      throw new HttpError.InternalServerError('서비스 오류');
    }
  };
}
