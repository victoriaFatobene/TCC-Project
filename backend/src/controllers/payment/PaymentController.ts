import { Request, Response } from "express";

export const processPayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { orderId, method } = req.body;

    if (!orderId || !method) { 
      return res.status(400).json({ 
        status: "error", 
        message: "orderId e method são obrigatórios." 
      });
    }

    // Simulação de processamento(PIX e Cartão)
    if (method === "PIX") {
      // aqui generará um QRCode ou chave PIX
      return res.json({ 
        status: "success", 
        message: `PIX gerado para o pedido ${orderId}`,
        paymentLink: "https://fake-pix-link.com/abc123" // exemplo de link de pagamento, podendo ser alterado ao decorrer do projeto(obviamente)
      });
    }

    if (method === "Card") {
      // aqui entrará integração com operadora de cartão
      return res.json({ 
        status: "success", 
        message: `Pagamento com cartão aprovado para o pedido ${orderId}` 
      });
    }

    return res.status(400).json({ 
      status: "error", 
      message: "Método de pagamento inválido." 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      status: "error", 
      message: "Erro interno no servidor." 
    });
  }
};

