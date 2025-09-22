import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController { // adicionar item ao pedido
  async handle(req: Request, res: Response) {
    try {
      const { orderId, productId, amount } = req.body;

      // Checagem de campos obrigatórios
      if (!orderId || !productId || !amount) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Checagem de quantidade válida
      if (amount <= 0) {
        return res.status(400).json({ error: "Quantidade inválida" });
      }

      const addItemService = new AddItemService(); // instanciando o serviço
      const item = await addItemService.execute({ orderId, productId, amount });

      return res.json({ message: "Item adicionado com sucesso", item }); 
    } catch (error) {
      return res.status(500).json({ error: error.message || "Erro ao adicionar item" }); 
    }
  }
}

export { AddItemController };