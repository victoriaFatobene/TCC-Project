import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class PesquisarProdutoController {
  async handle(req: Request, res: Response) {
    const { nome, categoriaId } = req.query;

    try {
      const produtos = await prismaClient.product.findMany({
        where: {
          ...(nome && { name: { contains: String(nome), mode: 'insensitive' } }),
          ...(categoriaId && { categoryId: String(categoriaId) }),
        },
        include: {
          category: true,
        },
      });

      if (produtos.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum produto encontrado" });
      }

      return res.json(produtos);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      return res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
  }
}