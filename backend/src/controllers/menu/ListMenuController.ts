import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class ListMenuController {
  handle = async (_req: Request, res: Response): Promise<void> => {
    try {
      const categories = await prismaClient.category.findMany({
        orderBy: { name: "asc" },
        include: {
          products: {
            orderBy: { name: "asc" }
          },
        },
      });

      const cardapio = categories
        .map((c: any) => ({
          category_id: c.id,
          category_name: c.name,
          products: c.products,
        }))
        .filter((c: any) => c.products && c.products.length > 0);

      res.json({ ok: true, cardapio });
    } catch (err) {
      console.error("ListMenuController error:", err);
      res.status(500).json({ ok: false, message: "Erro ao listar cardápio" });
    }
  };
}
