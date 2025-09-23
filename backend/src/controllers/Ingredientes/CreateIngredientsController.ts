import { Request, Response } from "express";
import prismaClient from '../../prisma';

export class CreateIngredientsController{
    async handle(req: Request, res: Response){
        const {name, price} = req.body;

        if (!name || price === undefined){
    return res.status(400).json({error: 'Nome e categoria do ingrediente'})
}

        const ingredient = await prismaClient.ingredient.create({
            data:{
                name,
                price,
            },
        });

        return res.json(ingredient);
    }
}



