import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const inspectionItems = [
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
    { name: "Periksa kebersihan panel", type: "genset" },
    { name: "Periksa ban depan", type: "vehicle" },
    { name: "Periksa ban belakang", type: "vehicle" },
    { name: "Periksa oli mesin", type: "vehicle" },
    { name: "Periksa cairan radiator", type: "vehicle" },
    { name: "Periksa rem depan", type: "vehicle" },
    { name: "Periksa rem belakang", type: "vehicle" },
    { name: "Periksa lampu depan", type: "vehicle" },
    { name: "Periksa wiper", type: "vehicle" },
    { name: "Periksa kaca spion", type: "vehicle" },
    { name: "Periksa aki", type: "vehicle" }
  ]

  await prisma.inspectionItem.createMany({
    data: inspectionItems,
    skipDuplicates: true
  })

  const gensetInspectionItems = await prisma.inspectionItem.findMany({
    where: { type: "genset" },
    orderBy: { id: "asc" }
  })

  const vehicleInspectionItems = await prisma.inspectionItem.findMany({
    where: { type: "vehicle" },
    orderBy: { id: "asc" }
  })

  if ((await prisma.gensetReport.count()) === 0) {
    await prisma.gensetReport.create({
      data: {
        regu: "Regu Malam",
        tanggal: new Date(),
        mesin: "Kubota",
        generator: "Denyo",
        shift: "Malam",
        speed: 1500,
        oliPress: 3.2,
        temp: 78.5,
        volt: 220,
        hz: 50,
        kw: 12.5,
        ampereR: 30,
        ampereS: 28,
        ampereT: 29,
        ampere: 87,
        solarLevelAwal: 65,
        solarLevelAkhir: 60,
        solarPemakaian: 5,
        gantiOliMesin: 0.5,
        gantiFilterOli: 0,
        gantiFilterSolar: 0,
        catatan: "Semua kondisi normal.",
        inspections: {
          create: gensetInspectionItems.slice(0, 6).map((item) => ({
            itemId: item.id,
            kondisi: "Normal",
            keterangan: ""
          }))
        }
      }
    })
  }

  if ((await prisma.vehicleReport.count()) === 0) {
    await prisma.vehicleReport.create({
      data: {
        tanggal: new Date(),
        unit: "Mobil Operasional 01",
        kmAwal: 12000,
        kmAkhir: 12075,
        solarAwal: 40,
        solarAkhir: 35,
        catatan: "Isi solar dan pemeriksaan rem sudah dilakukan.",
        inspections: {
          create: vehicleInspectionItems.slice(0, 5).map((item) => ({
            itemId: item.id,
            kondisi: "Normal",
            keterangan: ""
          }))
        }
      }
    })
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
