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

  findAllQnas = async () => {
    const qnas = await this.prisma.adminQna.findMany({
      select: {
        qnaId: true,
        userId: true,
        title: true,
        question: true,
        answer: true,
        qnaStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return qnas;
  };

  // qna 수정, 삭제할 때 필요한 ID를 찾는다.
  findQnaById = async (qnaId) => {
    const findQna = await this.prisma.adminQna.findUnique({
      where: {
        qnaId: +qnaId,
      },
    });
    return findQna;
  };

  // 데이터 수정
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

  // 데이터 삭제
  deleteQna = async (qnaId) => {
    const deletedQna = await this.prisma.adminQna.delete({
      where: {
        qnaId: +qnaId,
      },
    });

    return deletedQna;
  };
}
