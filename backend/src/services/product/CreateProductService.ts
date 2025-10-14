import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: number;          // agora é number, não string
  description: string;
  banner: string;
  category_id: string;    // ID real de categoria no banco
  imageUrl: string;       // obrigatório no schema
}

class CreateProductService {
  async execute({ name, price, description, banner, category_id, imageUrl }: ProductRequest) {

    const categoryExists = await prismaClient.category.findUnique({ where: { id: category_id } });
    if (!categoryExists) throw new Error("Categoria inválida");

    const defaultStatus = await prismaClient.status.findFirst({ where: { name: "DISPONIVEL" } });
    if (!defaultStatus) throw new Error("Status padrão não encontrado");

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        imageUrl,
        category: { connect: { id: category_id } },   // 🔑 Conecta à categoria
        status: { connect: { id: defaultStatus.id } } // 🔑 Conecta ao status
      }
    });

    return product;
  }
}

export { CreateProductService };