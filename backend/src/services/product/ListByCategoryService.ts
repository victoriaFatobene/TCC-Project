import prismaClient from "../../prisma";

interface ProductRequest {
    category_id: string
}
export class ListByCategoryService {
  async execute(categoryId: string) {
    const products = await prismaClient.product.findMany({
      where: { categoryId },
    });
    return products;
  }
}