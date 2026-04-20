import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.inspectionItem.createMany({
    data: [
      { name: "Periksa level coolant", type: "genset" },
      { name: "Periksa level oli", type: "genset" },
      { name: "Periksa level bahan bakar", type: "genset" },
      { name: "Periksa level air accu", type: "genset" },
      { name: "Periksa kondisi filter udara", type: "genset" },
      { name: "Periksa kondisi filter oli", type: "genset" },
      { name: "Periksa kondisi filter solar", type: "genset" },
      { name: "Periksa kondisi selang & pipa", type: "genset" },
      { name: "Periksa kondisi radiator", type: "genset" },
      { name: "Periksa kondisi belt", type: "genset" },
      { name: "Periksa kondisi kabel listrik", type: "genset" },
      { name: "Periksa kebersihan mesin", type: "genset" },
      { name: "Periksa kebersihan panel", type: "genset" }
    ],
    skipDuplicates: true
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })