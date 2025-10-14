import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const createProductService = new CreateProductService();

        if (!req.file) {
            throw new Error("error upload file");
        } else {
            const { filename: banner } = req.file;

            // 🔑 Converte price para número (Float)
            const numericPrice = Number(price);

            const product = await createProductService.execute({
                name,
                price: numericPrice,
                description,
                banner,
                category_id,
                imageUrl: `${process.env.APP_URL}/files/${banner}`
            });

            res.json(product);
        }
    }
}

export { CreateProductController };