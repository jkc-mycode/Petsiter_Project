export class PetsitterController {
    
    constructor( petsitterService) {
      // 생성자에서 전달받은 PostsRepository 의존성을 주입합니다.
      this.petsitterService =  petsitterService;
    }



    signUp = async (req, res, next) => {
      const{email, password, petsitterName, petsitterCareer, petsitterProfileImage, title, content, region, price, totalRate} = req.body;
  

      try {
        const petsitter = await this.petsitterService.petsitterSignUp({email, password, petsitterName, petsitterCareer, petsitterProfileImage, title, content, region, price, totalRate} );
        return res.status(201).json({ message: '회원가입이 완료되었습니다.', petsitter });
      } catch (err) {
        next(err);
      }
    };

}