import {Request, Response} from 'express';
import prismaClient from '../../prisma';

export class ListMenuItemController{
    async handle(req: Request, res:Response){
        const menuItems = await prismaClient.menuItem.findMany({
            orderBy:{
                name: 'asc',
            },
        });
        return res.json(menuItems);
    }
}