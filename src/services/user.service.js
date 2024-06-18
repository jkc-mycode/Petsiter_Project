

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
      }


    //   사용자 본인정보 수정
UpdateUser = async (email, password, nickname) => {
  
    try {
      const user = await this.userRepository.findUserByEmail(email);
       if (!user) {
      throw new Error.NotFound('존재하지 않는 게시글입니다.');
    }
    
    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.userRepository.UpdateUser(email, password, nickname);

    // 변경된 데이터를 조회합니다.
    const updateuser = await this.userRepository.UpdateUser (email);

    return {
        userId: updateuser.userId,
      email: updateuser.email,
      password: updateuser.password,
      nickname: updateuser.nickname,
      createdAt: updateuser.createdAt,
      updatedAt: updateuser.updatedAt,
    };
  } catch (err) {
    console.error(err);
    throw new Error.InternalServerError('서비스 오류');
  }
};

//   //사용자 본인정보 조회
//   getUserByNickName = async ( email) => {
//     const user = await this.userRepository.
//     findUserByEmail (email);
//     if (!user) throw new user.NotFound('사용자가 존재하지 않습니다.');


//     return {
//         userId: user.userId,
//       email: user.email,
//       password: user.password,
//       nickname: user.nickname,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,

//     };
//   } 
}