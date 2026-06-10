import { prisma } from "../src/lib/prisma.js";
import { authUtils } from "../src/lib/auth.js";
import { DEFAULT_COLUMNS } from "../src/constants/columns.js";

async function main() {
  const passwordHash = await authUtils.hashPassword("Password123!");

  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      passwordHash,
      columns: { create: DEFAULT_COLUMNS },
    },
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
