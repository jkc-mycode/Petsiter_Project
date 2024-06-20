import { ADMIN } from '../constants/admin.message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
export class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }

  // Qna 생성하기
  createQna = async (req, res, next) => {
    try {
      const { title, question, answer } = req.body;
      const user = req.user;
      const qna = await this.adminService.createQna(user, title, question, answer);

      return res
        .status(201)
        .json({ status: HTTP_STATUS.CREATED, message: ADMIN.QNA.CREATE, data: qna });
    } catch (err) {
      next(err);
    }
  };
  // Qna 목록조회 하기
  getAllQna = async (req, res, next) => {
    try {
      const qnas = await this.adminService.getAllQna();

      return res.status(200).json({ status: HTTP_STATUS.OK, data: qnas });
    } catch (err) {
      next(err);
    }
  };

  // qna 수정하기
  updateQna = async (req, res, next) => {
    try {
      const { qnaId } = req.params;
      const { title, question, answer } = req.body;

      const updatedQna = await this.adminService.updateQna(qnaId, title, question, answer);

      return res
        .status(200)
        .json({ status: HTTP_STATUS.OK, message: ADMIN.QNA.UPDATE, data: updatedQna });
    } catch (err) {
      next(err);
    }
  };

  // Qna 삭제 하기
  deleteQna = async (req, res, next) => {
    try {
      const { qnaId } = req.params;

      const deletedQna = await this.adminService.deleteQna(qnaId);

      return res
        .status(200)
        .json({ status: HTTP_STATUS.OK, message: ADMIN.QNA.DELETE, data: deletedQna });
    } catch (err) {
      next(err);
    }
  };
}
