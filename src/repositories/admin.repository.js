export class AdminRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // qna 생성
  createQna = async (user, title, question, answer, qnaStatus) => {
    const qna = await this.prisma.adminQna.create({
      data: {
        title,
        question,
        answer,
        qnaStatus,
        user: { connect: { userId: user.userId } },
      },
    });

    return qna;
  };

  // qna 전체목록 조회
  findAllQnas = async () => {
    const qnas = await this.prisma.adminQna.findMany({
      include: {
        user: true,
      },
    });

    return qnas;
  };

  // qna를  수정, 삭제할 경우에 필요한 ID를 찾습니다.
  findQnaById = async (qnaId) => {
    const findQna = await this.prisma.adminQna.findUnique({
      where: {
        qnaId: +qnaId,
      },
    });
    return findQna;
  };

  // Qna 수정
  updateQna = async (qnaId, title, question, answer, qnaStatus) => {
    const Updateqna = await this.prisma.adminQna.update({
      where: {
        qnaId: +qnaId,
      },
      data: {
        title,
        question,
        answer,
        qnaStatus,
      },
    });

    return Updateqna;
  };

  // qna 삭제
  deleteQna = async (qnaId) => {
    const deletedQna = await this.prisma.adminQna.delete({
      where: {
        qnaId: +qnaId,
      },
    });

    return deletedQna;
  };
}
