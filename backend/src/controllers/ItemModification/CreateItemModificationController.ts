import {Request, Response} from 'express';
import prismaClient from '../../prisma';

export class CreateItemModificationController{
    async handle(req: Request, res: Response){
        const {type, itemId, ingredientId} = req.body;

        if (!type || !itemId || !ingredientId){
            return res.status(400).json({error: 'Tipo, ID do item e ID do ingrediente são obrigatórios'})
        }

        const itemModification = await prismaClient.itemModification.create({
            data:{
                type,
                itemId,
                ingredientId,
            },
        });

        return res.json(itemModification);
    }
}