import { PrismaClient } from "../generated/prisma/client";

const prismaClient = new PrismaClient()

console.log('DATABASE_URL que aplicação está usando: ', process.env.DATABASE_URL)
export default prismaClient