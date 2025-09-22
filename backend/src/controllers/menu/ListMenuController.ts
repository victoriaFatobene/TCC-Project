import { Request, Response } from 'express';
import prisma from '../../prisma';

export class ListMenuController {
  async handle(_req: Request, res: Response): Promise<void> {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        products: {
          orderBy: { name: 'asc' },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            imageUrl: true,
            status: { select: { name: true } }, // se não tiver Status em Product, remova esta linha
          },
        },
      },
    });

    const cardapio = categories.map((c) => ({
      categoria: c.name,
      produtos: c.products.map((p) => ({
        id: p.id,
        nome: p.name,
        descricao: p.description,
        preco: p.price,
        imagem: p.imageUrl,
        status: (p as any).status?.name ?? 'DISPONIVEL',
      })),
    }));

    res.json({ ok: true, cardapio });
  }
}
