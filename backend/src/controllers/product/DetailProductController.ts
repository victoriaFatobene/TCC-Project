import { Request, Response } from 'express';
import { DetailProductService } from '../../services/product/DetailProductService';

export class DetailProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DetailProductService();
    const product = await service.execute(id);

    return res.json(product);
  }
}