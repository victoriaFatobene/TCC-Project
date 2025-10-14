import { Request, Response } from 'express';
import { UpdateProductService } from '../../services/product/UpdateProductService';

export class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, banner, category_id, is_active } = req.body;

    const service = new UpdateProductService();

    const product = await service.execute({
      id,
      name,
      description,
      price: price ? Number(price) : undefined,
      banner,
      category_id,
      is_active,
    });

    return res.json(product);
  }
}
