import 'dotenv/config';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import prismaClient from './prisma';
import { router } from './routes';
import { login } from './controllers/auth/loginController';
import { register } from './controllers/auth/registerController';

const app = express();
app.use(express.json());
app.use(cors());

// rotas principais
app.use(router);

// rotas de autenticação
app.post('/auth/register', register);
app.post('/auth/login', login);

// servir arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// middleware de erro — agora compatível com TypeScript
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
app.use(errorHandler);

// garantir status padrão no banco
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
  .then(() => console.log("✅ Status padrão garantido no backend!"))
  .catch((err) => console.error("❌ Erro ao garantir status padrão:", err));

app.listen(3333, () => console.log('🚀 Servidor Online na porta 3333!'));