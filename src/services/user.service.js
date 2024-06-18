import bcrypt from 'bcrypt';

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
      }


    //   사용자 본인정보 수정 API
UpdateUser = async (email, password, nickname) => {
  
    try {
    
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.userRepository.UpdateUser(email, hashedPassword, nickname);


    // 변경된 데이터를 조회합니다.
    const updateuser = await this.userRepository.UpdateUser (email);



    return {
        userId: updateuser.userId,
      email: updateuser.email,
      nickname: updateuser.nickname,
      profileImage: updateuser.profileImage,
      socialId: updateuser.socialId,
      provider: updateuser.provider,
      role: updateuser.role,
      createdAt: updateuser.createdAt,
      updatedAt: updateuser.updatedAt,
    };
  } catch (err) {
    console.error(err);
    throw new Error.InternalServerError('서비스 오류');
  }
};

  //사용자 본인정보 조회
  getUserById = async ( ) => {
    // 더미데이터
    const userId =  12
    const user = await this.userRepository.
    findUserById (userId);
    if (!user) throw new user.NotFound('사용자가 존재하지 않습니다.');


    return {
        userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      profileImage: user.profileImage,
      socialId: user.socialId,
      provider: user.provider,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,

    };
  } 
}