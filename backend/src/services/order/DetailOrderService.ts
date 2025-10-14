import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string;
}

class DetailOrderService{
    async execute({orderId} : DetailRequest){

        const orders = await prismaClient.item.findMany({
            where:{
                orderId: orderId
            },
            include:{
                product: true,
                order: true,
            }
        })
        return orders;
    }
}

export {DetailOrderService}