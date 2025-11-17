import prismaClient from "../src/prisma";

async function main() {
  // Cria os status padrão se não existirem
  await prismaClient.status.createMany({
    data: [
      { name: "DISPONIVEL" },
      { name: "INDISPONIVEL" },
      { name: "ESGOTADO" },
    ],
    skipDuplicates: true, // não cria se já existir
  });

  console.log("Status padrão garantido no banco!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });