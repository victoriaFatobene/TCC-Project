import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'
import prismaClient from './prisma';

import {router} from './routes'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error' 
    });
});

async function ensureDefaultStatus() {
  await prismaClient.status.createMany({
    data: [
      { name: "DISPONIVEL" },
      { name: "INDISPONIVEL" },
      { name: "ESGOTADO" },
    ],
    skipDuplicates: true,
  });
}

ensureDefaultStatus()
  .then(() => console.log("Status padrão garantido no backend!"))
  .catch((err) => console.error("Erro ao garantir status padrão:", err));

app.listen(3333, () => console.log('Servidor Online!!!!'))
