export class PetsitterRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getPetsitterList = async (orderByCondition) => {
    const petsitters = await this.prisma.petsitter.findMany({
      include: { certificate: true, houseImage: true },
      orderBy: orderByCondition ? orderByCondition : { createAt: 'desc' },
    });

    console.log(petsitters);

    return petsitters;
  };
}
