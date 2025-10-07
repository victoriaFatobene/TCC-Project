import prismaClient from "../src/prisma";

async function main() {
  await prismaClient.status.createMany({
    data: [
      { name: "DISPONIVEL" },
      { name: "INDISPONIVEL" },
      { name: "ESGOTADO" }
    ],
    skipDuplicates: true, // não cria se já existir
  });

  console.log("Status padrão criado com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
