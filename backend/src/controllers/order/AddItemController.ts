import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
  // Adicionar item ao pedido
  async handle(req: Request, res: Response) {
    try {
      const { orderId, productId, amount } = req.body;

      // Validação de campos obrigatórios
      if (!orderId || !productId || amount == null) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Validação de quantidade válida
      if (amount <= 0) {
        return res.status(400).json({ error: "Quantidade inválida" });
      }

      const addItemService = new AddItemService();

      // Adiciona item ao pedido
      const item = await addItemService.execute({ orderId, productId, amount });

      return res.status(200).json({ message: "Item adicionado com sucesso", item });
    } catch (error: any) {
      // Retorna erro amigável
      return res.status(500).json({ error: error.message || "Erro ao adicionar item" });
    }
  }
}

export { AddItemController };
