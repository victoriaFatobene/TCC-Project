import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class RemoveOrderService {
    async execute({ order_id }: OrderRequest) {
        // Primeiro verifica se o pedido existe
        const existingOrder = await prismaClient.order.findUnique({
            where: { id: order_id }
        });

        if (!existingOrder) {
            throw new Error("Pedido não encontrado!");
        }

        // Só deleta se existir
        const order = await prismaClient.order.delete({
            where: { id: order_id }
        });

        return order;
    }
}

export { RemoveOrderService };