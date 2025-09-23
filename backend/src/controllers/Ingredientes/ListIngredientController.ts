import {Request, Response} from 'express';
import prismaClient from '../../prisma';

export class ListIngredientController{
    async handle(req:Request, res: Response){
        const ingredients = await prismaClient.ingredient.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        return res.json(ingredients);
    }
}