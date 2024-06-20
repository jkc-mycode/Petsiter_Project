import { HttpError } from '../errors/http.error.js';
import { ADMIN } from '../constants/admin.message.constant.js';

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

  getAllQna = async () => {
    const qnas = await this.adminRepository.findAllQnas();

    qnas.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return qnas.map((qna) => ({
      qnaId: qna.qnaId,
      userId: qna.userId,
      title: qna.title,
      nickname: qna.user.nickname,
      qnaStatus: qna.qnaStatus,
      question: qna.question,
      answer: qna.answer,
      createdAt: qna.createdAt,
      updatedAt: qna.updatedAt,
    }));
  };

  getQnaById = async (userId) => {
    const qnauser = await this.adminRepository.getQnaById(userId);

    qnauser.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return qnauser.map((qna) => ({
      qnaId: qna.qnaId,
      userId: qna.userId,
      title: qna.title,
      qnaStatus: qna.qnaStatus,
      question: qna.question,
      answer: qna.answer,
      createdAt: qna.createdAt,
      updatedAt: qna.updatedAt,
    }));
  };

  // Qna 수정
  updateQna = async (qnaId, title, question, answer) => {
    try {
      const qnas = await this.adminRepository.findQnaById(qnaId);
      if (!qnas) {
        throw new HttpError.NotFound(ADMIN.ERROR.NOT_FOUND);
      }

      await this.adminRepository.updateQna(qnaId, title, question, answer);

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
      throw new HttpError.InternalServerError(ADMIN.ERROR.SERVER);
    }
  };

  deleteQna = async (qnaId) => {
    try {
      const qna = await this.adminRepository.findQnaById(qnaId);

      if (!qna) {
        throw new HttpError.NotFound(ADMIN.ERROR.NOT_FOUND);
      }

      await this.adminRepository.deleteQna(qnaId);

      return {
        qnaId: qna.qnaId,
      };
    } catch (err) {
      console.error(err);
      throw new HttpError.InternalServerError(ADMIN.ERROR.SERVER);
    }
  };
}
