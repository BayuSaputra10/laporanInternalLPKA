import { unstable_cache } from "next/cache"
import { prisma } from "./prisma"

function toIsoString<T extends { tanggal: Date }>(items: T[]) {
  return items.map((item) => {
    const { tanggal, ...rest } = item
    return {
      ...rest,
      tanggal: tanggal.toISOString(),
    }
  })
}

export const getDashboardData = unstable_cache(
  async () => {
    const [
      gensetReportsRaw,
      vehicleReportsRaw,
      vehicleFuelReportsRaw,
      gensetFuelReportsRaw,
      vehicleServiceReportsRaw,
      gensetServiceReportsRaw,
      totalGenset,
      totalVehicle,
      totalVehicleFuel,
      totalGensetFuel,
      totalVehicleService,
      totalGensetService,
    ] = await Promise.all([
      prisma.gensetReport.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: { id: true, regu: true, tanggal: true },
      }),
      prisma.vehicleReport.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: { id: true, jenisKendaraan: true, tanggal: true },
      }),
      prisma.vehicleFuelReport.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: { id: true, jenisKendaraan: true, tambahSolar: true, tanggal: true },
      }),
      prisma.gensetFuelReport.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: { id: true, tambahSolar: true, tanggal: true },
      }),
      prisma.vehicleServiceReport.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: { id: true, jenisKendaraan: true, catatan: true, tanggal: true },
      }),
      prisma.gensetServiceReport.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: { id: true, catatan: true, tanggal: true },
      }),
      prisma.gensetReport.count(),
      prisma.vehicleReport.count(),
      prisma.vehicleFuelReport.count(),
      prisma.gensetFuelReport.count(),
      prisma.vehicleServiceReport.count(),
      prisma.gensetServiceReport.count(),
    ])

    const totalKendaraan = totalVehicle + totalVehicleFuel + totalVehicleService
    const totalGensetAll = totalGenset + totalGensetFuel + totalGensetService

    return {
      gensetReports: toIsoString(gensetReportsRaw),
      vehicleReports: toIsoString(vehicleReportsRaw),
      vehicleFuelReports: toIsoString(vehicleFuelReportsRaw),
      gensetFuelReports: toIsoString(gensetFuelReportsRaw),
      vehicleServiceReports: toIsoString(vehicleServiceReportsRaw),
      gensetServiceReports: toIsoString(gensetServiceReportsRaw),
      totalGenset,
      totalVehicle,
      totalVehicleFuel,
      totalGensetFuel,
      totalVehicleService,
      totalGensetService,
      totalKendaraan,
      totalGensetAll,
    }
  },
  ["dashboard-data"],
  { revalidate: 60, tags: ["dashboard"] }
)

