

export class PetsitterRepository {

    constructor(prisma) {
      this.prisma = prisma;
    }





createPetsitter = async ( {email, password, petsitterName, petsitterCareer, petsitterProfileImage, title, content, region, price, totalRate}) => {


    const data = await this.prisma.petsitter.create({
      data: {
        email,
        password,
        petsitterName,
        petsitterCareer,
        petsitterProfileImage,
        title,
        content,
        region,
        price,
        totalRate,
      },

    });
    return data;
  };




  findPetsitterByEmail = async (email) => {
    const data = await this.prisma.petsitter.findUnique({
      where: {
        email: email,
      },
    });
    return data;
  };
  
}