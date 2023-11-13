import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const taro = await prisma.contact.upsert({
    where: { email: "taro@example.com" },
    update: {},
    create: {
      email: "taro@example.com",
      name: "taro",
    },
  });

  const jiro = await prisma.contact.upsert({
    where: { email: "jiro@example.com" },
    update: {},
    create: {
      email: "jiro@example.com",
      name: "jiro",
    },
  });
  console.log({ taro, jiro });

  const personal = await prisma.category.upsert({
    where: { name: "personal" },
    update: {},
    create: {
      name: "personal",
    },
  });

  const business = await prisma.category.upsert({
    where: { name: "business" },
    update: {},
    create: {
      name: "business",
    },
  });
  console.log({ personal, business });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
