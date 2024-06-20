export class AdminController {
  constructor(adminService) {
    // 생성자에서 전달받은 PostsService의 의존성을 주입합니다.
    this.adminService = adminService;
  }
  createQna = async (req, res, next) => {
    try {
      const { title, question, answer } = req.body;
      const user = req.user;
      const qna = await this.adminService.createQna(user, title, question, answer);

      return res.status(201).json({ data: qna });
    } catch (err) {
      next(err);
    }
  };

  getAllQna = async (req, res, next) => {
    try {
      const qnas = await this.adminService.getAllQna();

      return res.status(200).json({ data: qnas });
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

      return res.status(200).json({ data: updatedQna });
    } catch (err) {
      next(err);
    }
  };

  deleteQna = async (req, res, next) => {
    try {
      const { qnaId } = req.params;

      const deletedQna = await this.adminService.deleteQna(qnaId);

      return res.status(200).json({ data: deletedQna });
    } catch (err) {
      next(err);
    }
  };
}
