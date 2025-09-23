import { Request, Response } from 'express';
import prismaClient from '../../prisma';

export class CreateProductIngredientController {
  async handle(req: Request, res: Response) {
    const { productId, ingredientId } = req.body;

    if (!productId || !ingredientId) {
      return res.status(400).json({ error: 'O ID do produto e o ID do ingrediente são obrigatórios.' });
    }

    const productIngredient = await prismaClient.productIngredient.create({
      data: {
        productId,
        ingredientId,
      },
    });

    return res.json(productIngredient);
  }
}