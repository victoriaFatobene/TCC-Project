import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersServices";

class ListOrdersController{
    async handle(req: Request, res: Response){
       const listOrderService = new ListOrdersService();

       const orders = await listOrderService.execute();

       res.json(orders)
    }
}

export {ListOrdersController}