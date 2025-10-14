import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
    async handle(req: Request, res: Response) {
        try {
            const orderId = req.query.order_id as string;

            // Validação de parâmetro
            if (!orderId) {
                return res.status(400).json({ error: "O parâmetro order_id é obrigatório" });
            }

            const detailOrderService = new DetailOrderService();

            const orders = await detailOrderService.execute({
                orderId // ✅ passa no formato que o Prisma espera
            });

            return res.status(200).json(orders);
        } catch (error: any) {
            return res.status(500).json({ error: error.message || "Erro ao detalhar pedido" });
        }
    }
}

export { DetailOrderController };
