import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  const gensetReports = await prisma.gensetReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const vehicleReports = await prisma.vehicleReport.findMany({
    take: 5,
    orderBy: { id: "desc" }
  })

  const totalGenset = await prisma.gensetReport.count()
  const totalVehicle = await prisma.vehicleReport.count()
  const totalVehicleFuel = await prisma.vehicleFuelReport.count()
  const totalGensetFuel = await prisma.gensetFuelReport.count()
  const totalVehicleService = await prisma.vehicleServiceReport.count()
  const totalGensetService = await prisma.gensetServiceReport.count()

  // Hitung total gabungan
  const totalKendaraan = totalVehicle + totalVehicleFuel + totalVehicleService
  const totalGensetAll = totalGenset + totalGensetFuel + totalGensetService

  return NextResponse.json({
    gensetReports,
    vehicleReports,
    totalGenset,
    totalVehicle,
    totalVehicleFuel,
    totalGensetFuel,
    totalVehicleService,
    totalGensetService,
    totalKendaraan,
    totalGensetAll
  })
}

