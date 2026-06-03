import { prisma } from "../src/lib/prisma.js";

async function main() {
  await prisma.column.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, title: "TODO", position: 0 },
  });

  await prisma.column.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, title: "IN_PROGRESS", position: 1 },
  });

  await prisma.column.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, title: "DONE", position: 2 },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
