  // 펫시터 회원가입
  
  
  export class PetsitterAuthController {
    constructor(petsitterAuthService) {
      this.petsitterAuthService = petsitterAuthService;
    }
  
  signUp = async (req, res, next) => {
    const {
      email,
      password,
      petsitterName,
      petsitterCareer,
      title,
      content,
      region,
      price,
      totalRate,
    } = req.body;
    try {
      const petsitter = await this.petsitterAuthService.petsitterSignUp({
        email,
        password,
        petsitterName,
        petsitterCareer,
        title,
        content,
        region,
        price,
        totalRate,
      });
      return res.status(201).json({status: 200, message: '회원가입이 완료되었습니다.', petsitter });
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
  
  
      const { accessToken} = await this.petsitterAuthService.PetsittersignIn(email, password);
     
  
      res.header('authorization', accessToken);
      return res.status(200).json({status: 200, message:'로그인에 성공하였습니다', accessToken });
    } catch (err) {
      // console.error(err);
      next(err);
    }
  };




}