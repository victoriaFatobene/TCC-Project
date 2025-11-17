import prismaClient from "../../prisma";

export class DetailProductService {
  async execute(id: string) {
    const product = await prismaClient.product.findUnique({
      where: { id },
      include: {
        category: true, // traz os dados da categoria junto (opcional)
      },
    });

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }
}