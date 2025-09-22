import prismaClient from "../../prisma";

interface ItemRequest { // DTO(data transfer object - objeto de transferência de dados)
  orderId: string;
  productId: string;
  amount: number;
}

class AddItemService {
  async execute({ orderId, productId, amount }: ItemRequest) {
    // Verifica se o item já existe no pedido
    const existingItem = await prismaClient.item.findFirst({
      where: { orderId, productId },
    });

    if (existingItem) {
      // Se existir, aumenta a quantidade
      const updatedItem = await prismaClient.item.update({
        where: { id: existingItem.id },
        data: { amount: existingItem.amount + amount },
      });
      return updatedItem;
    }

    // Se não existir, cria novo item
    const item = await prismaClient.item.create({
      data: {
        orderId,
        productId,
        amount,
      },
    });

    return item;
  }
}

export { AddItemService };