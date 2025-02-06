import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: "2",
        name: "Alice Silva",
        email: "alice@email.com",
        password: "senha123",
        role: "CONSUMER",
      },
      {
        id: "3",
        name: "Bruno Souza",
        email: "bruno@email.com",
        password: "seguranca456",
        role: "CONSUMER",
      },
      {
        id: "4",
        name: "Carla Mendes",
        email: "carla@email.com",
        password: "pass789",
        role: "CONSUMER",
      },
    ],
  });

  console.log("✅ Usuários inseridos com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
