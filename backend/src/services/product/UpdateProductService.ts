import prismaClient from "../../prisma";

interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  banner?: string;
  category_id?: string;
  is_active?: boolean;
}

export class UpdateProductService {
  async execute({ id, name, description, price, banner, category_id, is_active }: UpdateProductRequest) {
    // verifica se o produto existe
    const productExists = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new Error("Produto não encontrado");
    }

    // atualiza apenas os campos que foram enviados
    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        banner,
        category_id,
        is_active,
      },
    });

    return updatedProduct;
  }
}